import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/shared/services/author.service';
import { ArticleService } from 'src/app/shared/services/article.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Article } from 'src/app/shared/interfaces/article.type';
import { AUTHOR, MEMBER, CHARITY, COMPANY, FUNDRAISER, MTS_ACCOUNT, BLOGGER, VLOGGER, PODCAST, GUESTPOST, ADVISOR, ONLINESTORE, PAIDPREMIUMGROUP, ONLINECOURSE, INFLUENCERMARKETPLACE, SERVICES, JOB, ECOMMERCE, INVESTMENT, POLITICIAN, HOSTEVENT, RESTAURANT, VACATIONSRENTALS, STAFF } from 'src/app/shared/constants/member-constant';
import { NzModalService } from 'ng-zorro-antd';
import { SeoService } from 'src/app/shared/services/seo/seo.service';
import { AnalyticsService } from 'src/app/shared/services/analytics/analytics.service';
import { Follower } from 'src/app/shared/interfaces/follower.type';
import { Language } from 'src/app/shared/interfaces/language.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  STAFF = STAFF;
  AUTHOR = AUTHOR;
  MEMBER = MEMBER; 
  CHARITY = CHARITY; 
  COMPANY = COMPANY;
  MTS_ACCOUNT = MTS_ACCOUNT; 
  FUNDRAISER = FUNDRAISER; 
  BLOGGER = BLOGGER;
  VLOGGER = VLOGGER;
  PODCAST = PODCAST;
  GUESTPOST = GUESTPOST;
  ADVISOR = ADVISOR;
  ONLINESTORE = ONLINESTORE;
  PAIDPREMIUMGROUP = PAIDPREMIUMGROUP;
  ONLINECOURSE = ONLINECOURSE;
  INFLUENCERMARKETPLACE = INFLUENCERMARKETPLACE;
  SERVICES = SERVICES;
  JOB = JOB;
  ECOMMERCE = ECOMMERCE;
  INVESTMENT = INVESTMENT;
  POLITICIAN = POLITICIAN;
  HOSTEVENT = HOSTEVENT;
  RESTAURANT = RESTAURANT;
  VACATIONSRENTALS = VACATIONSRENTALS;
  authorDetails: any = {};
  followers: any = [];
  subscribers: any = [];
  articles: any = [];
  isReportAbuseLoading: boolean = false;
  isLoggedInUser: boolean = false;
  isFollowing: boolean = false;
  userDetails;
  isLoaded: boolean = false;
  selectedLang: string;
  lastVisibleFollower;
  lastVisibleFollowing;
  loadingMoreFollowers: boolean = false;
  loadingMoreFollowings: boolean = false;
  lastArticleIndex;
  lastArticleIndexOfAudio;
  lastArticleIndexOfVideo;
  audioArticles: Article[] = [];
  videoArticles: Article[] = [];
  rss = '';
  languageList: Language[];
  selectedLanguage: string;
  DefaulatLangEn:boolean = false;
  DefaulatLangFr:boolean = false;
  DefaulatLangEs:boolean = false;
  url:any;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private articleService: ArticleService,
    public translate: TranslateService,
    private authService: AuthService,
    public userService: UserService,
    public langService: LanguageService,
    private modal: NzModalService,
    private seoService: SeoService,
    private analyticsService: AnalyticsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('authorSlug')) {
        this.router.navigate(['/', params.get('authorSlug')]);
        return;
      }

      const slug = params.get('slug');
      if (slug == 'undefined')
        return;

      this.rss = `?member=${slug}`;

      this.authorService.getUserBySlug(slug).subscribe(author => {
        this.authorDetails = author;
        this.followers = [];
        this.subscribers = [];
        this.getFollowersDetails();
        this.getFollowingDetails();
        this.getArticleList(author['id']);
        this.setUserDetails();

        this.seoService.updateMetaTags({
          title: this.authorDetails.fullname,
          description: this.authorDetails[`biography_${this.authorDetails?.lang}`]?.substring(0, 154) || this.authorDetails?.bio?.substring(0, 154),
          keywords: this.authorDetails.fullname,
          summary: this.authorDetails[`biography_${this.authorDetails?.lang}`] || this.authorDetails?.bio?.substring(0, 154),
          type: this.authorDetails?.type,
          image: { url: this.authorDetails?.avatar?.url }
        });

        
        // Code change user type logo

        this.languageList = this.langService.geLanguageList();
        this.selectedLanguage = this.langService.defaultLanguage;
        if(this.selectedLanguage == "en"){
          this.DefaulatLangEn = true
          this.DefaulatLangFr = false
          this.DefaulatLangEs = false
        }else if((this.selectedLanguage == "fr")){
            this.DefaulatLangEn = false
            this.DefaulatLangFr = true
            this.DefaulatLangEs = false
            if((this.authorDetails.email == 'blogger2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/blogger_fr.png' 
            } else if((this.authorDetails.email == 'guestposter2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/guest_post_fr.png' 
            }else if((this.authorDetails.email == 'vlogger2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/vlogger_fr.png' 
            }else if((this.authorDetails.email == 'companymts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/company_fr.png' 
            }else if((this.authorDetails.email == 'Investmentmts2022@outlook.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/investment_fr.png' 
            }else if((this.authorDetails.email == 'fundraisermts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/fundraiser_fr.png' 
            }else if((this.authorDetails.email == 'ecommercemts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/e-commerce_fr.png' 
            }else if((this.authorDetails.email == 'advisor2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/advisor_fr.png' 
            }else if((this.authorDetails.email == 'servicemts2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/services_fr.png' 
            }else if((this.authorDetails.email == 'paidpremiumgroup@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/paid_premium_group_fr.png' 
            }else if((this.authorDetails.email == 'jobmts2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/job_fr.png' 
            }else if((this.authorDetails.email == 'influencermarketing2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/influencer_marketing_fr.png' 
            }else if((this.authorDetails.email == 'hostmts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/host_event_fr.png' 
            }else if((this.authorDetails.email == 'politicianmts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/politian_fr.png' 
            }else if((this.authorDetails.email == 'Vacationrental2022@outlook.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/vacation_rentels_fr.png' 
            }else if((this.authorDetails.email == 'OnlineCoursemts2022@outlook.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/online_course_fr.png' 
            }else if((this.authorDetails.email == 'charitymts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/charity_fr.png' 
            }else if((this.authorDetails.email == 'Podcaster0805@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/podcaster_fr.png' 
            }else if((this.authorDetails.email == 'Restaurant2022@outlook.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/restauant_fr.png' 
            }else if((this.authorDetails.email == 'Academymts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/fr/academy_fr.png' 
            }

        }else  if((this.selectedLanguage == "es")) {
          this.DefaulatLangEn = false
            this.DefaulatLangFr = false
            this.DefaulatLangEs = true
            if((this.authorDetails.email == 'blogger2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/blogger_es.png'
            } else if((this.authorDetails.email == 'guestposter2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/guest_post_es.png' 
            }else if((this.authorDetails.email == 'vlogger2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/vlogger_es.png' 
            }else if((this.authorDetails.email == 'companymts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/company_es.png' 
            }else if((this.authorDetails.email == 'Investmentmts2022@outlook.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/investment_es.png' 
            }else if((this.authorDetails.email == 'fundraisermts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/fundraiser_es.png' 
            }else if((this.authorDetails.email == 'ecommercemts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/e-commerce_es.png' 
            }else if((this.authorDetails.email == 'advisor2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/advisor_es.png' 
            }else if((this.authorDetails.email == 'servicemts2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/services_es.png' 
            }else if((this.authorDetails.email == 'paidpremiumgroup@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/paid_premium_group_es.png' 
            }else if((this.authorDetails.email == 'jobmts2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/job_es.png' 
            }else if((this.authorDetails.email == 'influencermarketing2022@yahoo.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/influencer_marketing_es.png' 
            }else if((this.authorDetails.email == 'hostmts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/host_event_es.png' 
            }else if((this.authorDetails.email == 'politicianmts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/politian_es.png' 
            }else if((this.authorDetails.email == 'Vacationrental2022@outlook.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/vacation_rentels_es.png' 
            }else if((this.authorDetails.email == 'OnlineCoursemts2022@outlook.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/online_course_es.png' 
            }else if((this.authorDetails.email == 'charitymts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/charity_es.png' 
            }else if((this.authorDetails.email == 'Podcaster0805@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/podcaster_es.png' 
            }else if((this.authorDetails.email == 'Restaurant2022@outlook.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/restauant_es.png' 
            }else if((this.authorDetails.email == 'Academymts2022@gmail.com')){
              this.authorDetails.avatar.url = 'assets/images/usertype_logo/es/academy_es.png' 
            }
        }
      });
    });
  }

  ngAfterViewChecked(): void {
    if (!this.isLoaded) {
      delete window['addthis']
      setTimeout(() => { this.loadScript(); }, 100);
      this.isLoaded = true;
    }
  }

  /**
   * Set user params 
   */
  async setUserDetails() {

    this.authService.getAuthState().subscribe(async (user) => {
      if (!user) {
        this.userDetails = null;
        this.isLoggedInUser = false;
        return;
      }
      this.userDetails = await this.authService.getLoggedInUserDetails();
      if (!this.userDetails) {
        this.userDetails = null;
        this.isLoggedInUser = false;
      } else {
        this.setFollowOrNot();
        this.isLoggedInUser = true;
      }
    })
  }

  getFollowersDetails() {
    // this.authorService.getFollowers(this.authorDetails.id).subscribe((followers) => {
    //   this.followers = followers;
    // })
    this.authorService.getFollowers_new(this.authorDetails.id, 14, null, this.lastVisibleFollower).subscribe((data) => {
      this.loadingMoreFollowers = false;

      data.followers = this.filterFollowersWithAvatar(data.followers);

      this.followers = data.followers;

      this.lastVisibleFollower = data.lastVisible;
    });
  }

  filterFollowersWithAvatar(followers: Array<Follower>) {
    // currently hiding follwowers with no avatar for admin profile

    if(Array.isArray(followers) && this.authorDetails && this.authorDetails.slug === 'my-trending-stories') {
      return followers.filter((follower) => follower.avatar)
    } else {
      return followers
    }
  }

  getFollowingDetails() {
    // this.authorService.getFollowings(this.authorDetails.id).subscribe((following) => {
    //   this.subscribers = following;
    // })
    this.loadingMoreFollowings = true;
    this.authorService.getFollowings_new(this.authorDetails.id, 14, null, this.lastVisibleFollower).subscribe((data) => {
      this.loadingMoreFollowings = false;
      this.subscribers = data.followings
      this.lastVisibleFollowing = data.lastVisible;
    });
  }
  getArticleList(authorId) {
    this.articleService.getArticlesByAuthor(authorId, 12).subscribe((articleData) => {
      this.articles = articleData.articleList;
      this.lastArticleIndex = articleData.lastVisible;
    })
  }
  loadMoreArticle() {
    const authorId = this.authorDetails.id;
    this.articleService.getArticlesByAuthor(authorId, 12, 'next', this.lastArticleIndex).subscribe((articleData) => {
      let mergedData: any = [...this.articles, ...articleData.articleList];
      this.articles = this.getDistinctArray(mergedData)
      this.lastArticleIndex = articleData.lastVisible;
    })
  }
  reportAbuseAuthor() {
    if (this.isLoggedInUser) {
    this.isReportAbuseLoading = true;
    this.authorService.reportAbusedUser(this.authorDetails.id).then(() => {
      this.showAbuseSuccessMessage();
      this.isReportAbuseLoading = false;
    }).catch(() => {
      this.isReportAbuseLoading = false;
    })
  }else{
    this.isVisible = true;
  }
  }
  showAbuseSuccessMessage() {

    this.modal.success({
      nzTitle: this.translate.instant('Report'),
      nzContent: this.translate.instant('ReportMessage')
    });
  }
  getUserDetails() {
    return {
      fullname: this.userDetails.fullname,
      slug: this.userDetails.slug ? this.userDetails.slug : '',
      avatar: this.userDetails.avatar ? this.userDetails.avatar : '',
      id: this.userDetails.id,
      type: this.userDetails.type ? this.userDetails.type : AUTHOR
    }
  }
  getAuthorDetails() {
    return {
      fullname: this.authorDetails.fullname,
      slug: this.authorDetails.slug ? this.authorDetails.slug : '',
      avatar: this.authorDetails.avatar ? this.authorDetails.avatar : '',
      id: this.authorDetails.id,
    }
  }
  async follow(authorId) {
    if (this.isLoggedInUser) {
    const userDetails = this.getUserDetails();
    const authorDetails = this.getAuthorDetails();
    if (userDetails.id == authorId) {
      this.showSameFollowerMessage();
      return;
    }

    await this.authorService.follow(authorId, AUTHOR);
    this.analyticsService.logEvent("follow_author", {
      author_id: authorDetails.id,
      author_name: authorDetails.fullname,
      user_uid: userDetails.id,
      user_name: userDetails.fullname,
    });
  }else{
    this.isVisible = true;
  }
  }

  showSameFollowerMessage() {
    this.modal.warning({
      nzTitle: this.translate.instant('FollowNotAllowed'),
      nzContent: this.translate.instant('FollowNotAllowedMessage')
    });
  }

  async unfollow(authorId) {
    if (this.isLoggedInUser) {
    const userDetails = this.getUserDetails();
    const authorDetails = this.getAuthorDetails();
    await this.authorService.unfollow(authorId, userDetails.type);

    this.analyticsService.logEvent("unfollow_author", {
      author_id: authorDetails.id,
      author_name: authorDetails.fullname,
      user_uid: userDetails.id,
      user_name: userDetails.fullname,
    });
  }else{
    this.isVisible = true;
  }
  } 
  setFollowOrNot() {

    this.authorService.isUserFollowing(this.authorDetails.id, this.getUserDetails().id).subscribe((data) => {
      if (data) {
        this.isFollowing = true;
      } else {
        this.isFollowing = false;
      }
    });
  }
  public loadScript() {

    let node = document.createElement('script');
    node.src = environment.addThisScript;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  setLanguageNotification() {
    this.selectedLang = this.langService.getSelectedLanguage();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selectedLang = this.langService.getSelectedLanguage();
    })
  }
  loadMoreFollowers(action = "next") {
    this.loadingMoreFollowers = true;
    this.authorService.getFollowers_new(this.authorDetails.id, 14, action, this.lastVisibleFollower).subscribe((data) => {
      this.loadingMoreFollowers = false;

      data.followers = this.filterFollowersWithAvatar(data.followers);

      let mergedData: any = [...this.followers, ...data.followers]
      this.followers = this.getDistinctArray(mergedData)

      this.lastVisibleFollower = data.lastVisible;
    });
  }
  loadMoreFollowings(action = "next") {
    this.loadingMoreFollowings = true;
    this.authorService.getFollowings_new(this.authorDetails.id, 14, action, this.lastVisibleFollowing).subscribe((data) => {
      this.loadingMoreFollowings = false;
      let mergedData: any = [...this.subscribers, ...data.followings];
      this.subscribers = this.getDistinctArray(mergedData)
      this.lastVisibleFollowing = data.lastVisible;
    });
  }
  replaceImage(url) {
    let latestURL = url
    if (url) {
      latestURL = latestURL.replace('http://cdn.mytrendingstories.com/', 'https://cdn.mytrendingstories.com/')
        .replace('https://abc2020new.com/', 'https://assets.mytrendingstories.com/');
    }
    return latestURL;
  }
  getDistinctArray(data) {
    var resArr = [];
    data.filter(function (item) {
      var i = resArr.findIndex(x => x.id == item.id);
      if (i <= -1) {
        resArr.push(item);
      }
      return null;
    });
    return resArr;
  }
  getAudioArticles() {
    if (this.audioArticles.length != 0)
      return;
    const authorId = this.authorDetails.id;
    this.articleService.getArticlesByAuthor(authorId, 12, 'first', null, 'audio').subscribe((articleData) => {
      this.audioArticles = articleData.articleList;
      this.lastArticleIndexOfAudio = articleData.lastVisible;
    })
  }
  getVideoArticles() {
    if (this.videoArticles.length != 0)
      return;
    const authorId = this.authorDetails.id;
    this.articleService.getArticlesByAuthor(authorId, 12, 'first', null, 'video').subscribe((articleData) => {
      this.videoArticles = articleData.articleList;
      this.lastArticleIndexOfVideo = articleData.lastVisible;
    })
  }
  loadMoreAudioArticles() {
    const authorId = this.authorDetails.id;
    this.articleService.getArticlesByAuthor(authorId, 12, 'next', this.lastArticleIndexOfAudio, 'audio').subscribe((articleData) => {
      let mergedData: any = [...this.audioArticles, ...articleData.articleList];
      this.audioArticles = this.getDistinctArray(mergedData)
      this.lastArticleIndexOfAudio = articleData.lastVisible;
    })
  }

  loadMoreVideoArticles() {
    const authorId = this.authorDetails.id;
    this.articleService.getArticlesByAuthor(authorId, 12, 'next', this.lastArticleIndexOfVideo, 'video').subscribe((articleData) => {
      let mergedData: any = [...this.videoArticles, ...articleData.articleList];
      this.videoArticles = this.getDistinctArray(mergedData)
      this.lastArticleIndexOfVideo = articleData.lastVisible;
    })
  }
  getTextArticle() {
    const authorId = this.authorDetails.id;
    this.getArticleList(authorId);
  }

  isVisible = false;
  isOkLoading = false;
  followerData = "alltime";
 
  showFollowOption(): void {
    this.isVisible = true;

  }

  async handleOk() {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.router.navigate(["auth/login"]);
    }, 1000)

  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
