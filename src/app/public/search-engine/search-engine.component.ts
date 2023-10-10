import { Component, HostListener, OnInit } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import * as firebase from 'firebase/app';
import { CacheService } from 'src/app/shared/services/cache.service';
import { environment } from 'src/environments/environment';
const searchClient = algoliasearch(
  'N7WFUORZZU',
  '6f5d2e637debb45f0078b85091532c42'
);
@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss']
})
export class SearchEngineComponent implements OnInit {
  searchValue = "";
  selectedLanguage: string = "";
  articleBrand: any;
  buyCount: any;
  showResult: boolean = false;
  config = {
    indexName: environment.algolia.index.fullSearch,
    searchClient,
    routing: true
  };

  textArticleConfig = {
    indexName: environment.algolia.index.fullSearch,
    searchClient,
    routing: true
  };

  videoArticleConfig = {
    indexName: environment.algolia.index.videoArticles,
    searchClient,
    routing: true
  };

  audioArticleConfig = {
    indexName: environment.algolia.index.audioArticles,
    searchClient,
    routing: true
  };

  companyConfig = {
    indexName: environment.algolia.index.companies,
    searchClient,
    routing: true
  };

  charityConfig = {
    indexName: environment.algolia.index.charities,
    searchClient,
    routing: true
  };

  fundraiserConfig = {
    indexName: environment.algolia.index.fundraisers,
    searchClient,
    routing: true
  };
  bloggersConfig = {
    indexName: environment.algolia.index.bloggers,
    searchClient,
    routing: true
  };
  vloggersConfig = {
    indexName: environment.algolia.index.vloggers,
    searchClient,
    routing: true
  };
  podcasterConfig = {
    indexName: environment.algolia.index.podcasters,
    searchClient,
    routing: true
  };

  guestpostersConfig = {
    indexName: environment.algolia.index.guestposters,
    searchClient,
    routing: true
  };

  advisorsConfig = {
    indexName: environment.algolia.index.advisors,
    searchClient,
    routing: true
  };

  politiciansConfig = {
    indexName: environment.algolia.index.politicians,
    searchClient,
    routing: true
  };

  ecommerceConfig = {
    indexName: environment.algolia.index.ecommerce,
    searchClient,
    routing: true
  };

  online_courseConfig = {
    indexName: environment.algolia.index.online_course,
    searchClient,
    routing: true
  };

  servicesConfig = {
    indexName: environment.algolia.index.services,
    searchClient,
    routing: true
  };

  jobsConfig = {
    indexName: environment.algolia.index.jobs,
    searchClient,
    routing: true
  };

  host_eventConfig = {
    indexName: environment.algolia.index.host_event,
    searchClient,
    routing: true
  };

  influencer_marketingConfig = {
    indexName: environment.algolia.index.influencer_marketing,
    searchClient,
    routing: true
  };

  paid_premium_groupsConfig = {
    indexName: environment.algolia.index.paid_premium_groups,
    searchClient,
    routing: true
  };

  restaurantsConfig = {
    indexName: environment.algolia.index.restaurants,
    searchClient,
    routing: true
  };

  investmentsConfig = {
    indexName: environment.algolia.index.investments,
    searchClient,
    routing: true
  };

  vacations_rentalsConfig = {
    indexName: environment.algolia.index.vacations_rentals,
    searchClient,
    routing: true
  };

  //public OrderIndex = 0;
  articleBrand1 = [
    { "brandName": "" },
    { "brandName": "" },
    { "brandName": "" },
    { "brandName": "" },
    { "brandName": "" },
    { "brandName": "" },
    { "brandName": "" },
    { "brandName": "" },
    { "brandName": "" },
    { "brandName": "" },
    { "brandName": "" },
    { "brandName": "" }
  ];
  constructor(
    public translate: TranslateService,
    private languageService: LanguageService,
    private cacheService: CacheService
  ) {
  }
  ngOnInit(): void {
    this.selectedLanguage = this.languageService.getSelectedLanguage();

    this.config.indexName = environment.algolia.index.fullSearch + this.selectedLanguage;
    this.charityConfig.indexName = environment.algolia.index.charities + this.selectedLanguage;
    this.companyConfig.indexName = environment.algolia.index.companies + this.selectedLanguage;
    this.fundraiserConfig.indexName = environment.algolia.index.fundraisers + this.selectedLanguage;
    this.textArticleConfig.indexName = environment.algolia.index.textArticles + this.selectedLanguage;
    this.audioArticleConfig.indexName = environment.algolia.index.audioArticles + this.selectedLanguage;
    this.videoArticleConfig.indexName = environment.algolia.index.videoArticles + this.selectedLanguage;
    this.bloggersConfig.indexName = environment.algolia.index.bloggers + this.selectedLanguage;
    this.vloggersConfig.indexName = environment.algolia.index.vloggers + this.selectedLanguage;
    this.podcasterConfig.indexName = environment.algolia.index.podcasters + this.selectedLanguage;
    this.guestpostersConfig.indexName = environment.algolia.index.guestposters + this.selectedLanguage;
    this.advisorsConfig.indexName = environment.algolia.index.advisors + this.selectedLanguage;
    this.politiciansConfig.indexName = environment.algolia.index.politicians + this.selectedLanguage;
    this.ecommerceConfig.indexName = environment.algolia.index.ecommerce + this.selectedLanguage;
    this.online_courseConfig.indexName = environment.algolia.index.online_course + this.selectedLanguage;
    this.servicesConfig.indexName = environment.algolia.index.services + this.selectedLanguage;
    this.jobsConfig.indexName = environment.algolia.index.jobs + this.selectedLanguage;
    this.host_eventConfig.indexName = environment.algolia.index.host_event + this.selectedLanguage;
    this.influencer_marketingConfig.indexName = environment.algolia.index.influencer_marketing + this.selectedLanguage;
    this.paid_premium_groupsConfig.indexName = environment.algolia.index.paid_premium_groups + this.selectedLanguage;
    this.restaurantsConfig.indexName = environment.algolia.index.restaurants + this.selectedLanguage;
    this.investmentsConfig.indexName = environment.algolia.index.investments + this.selectedLanguage;
    this.vacations_rentalsConfig.indexName = environment.algolia.index.vacations_rentals + this.selectedLanguage;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selectedLanguage = this.languageService.getSelectedLanguage();

      this.config.indexName = environment.algolia.index.fullSearch + this.selectedLanguage;
      this.charityConfig.indexName = environment.algolia.index.charities + this.selectedLanguage;
      this.companyConfig.indexName = environment.algolia.index.companies + this.selectedLanguage;
      this.fundraiserConfig.indexName = environment.algolia.index.fundraisers + this.selectedLanguage;
      this.textArticleConfig.indexName = environment.algolia.index.textArticles + this.selectedLanguage;
      this.audioArticleConfig.indexName = environment.algolia.index.audioArticles + this.selectedLanguage;
      this.videoArticleConfig.indexName = environment.algolia.index.videoArticles + this.selectedLanguage;
      this.bloggersConfig.indexName = environment.algolia.index.bloggers + this.selectedLanguage;
      this.vloggersConfig.indexName = environment.algolia.index.vloggers + this.selectedLanguage;
      this.podcasterConfig.indexName = environment.algolia.index.podcasters + this.selectedLanguage;
      this.guestpostersConfig.indexName = environment.algolia.index.guestposters + this.selectedLanguage;
      this.advisorsConfig.indexName = environment.algolia.index.advisors + this.selectedLanguage;
      this.politiciansConfig.indexName = environment.algolia.index.politicians + this.selectedLanguage;
      this.ecommerceConfig.indexName = environment.algolia.index.ecommerce + this.selectedLanguage;
      this.online_courseConfig.indexName = environment.algolia.index.online_course + this.selectedLanguage;
      this.servicesConfig.indexName = environment.algolia.index.services + this.selectedLanguage;
      this.jobsConfig.indexName = environment.algolia.index.jobs + this.selectedLanguage;
      this.host_eventConfig.indexName = environment.algolia.index.host_event + this.selectedLanguage;
      this.influencer_marketingConfig.indexName = environment.algolia.index.influencer_marketing + this.selectedLanguage;
      this.paid_premium_groupsConfig.indexName = environment.algolia.index.paid_premium_groups + this.selectedLanguage;
      this.restaurantsConfig.indexName = environment.algolia.index.restaurants + this.selectedLanguage;
      this.investmentsConfig.indexName = environment.algolia.index.investments + this.selectedLanguage;
      this.vacations_rentalsConfig.indexName = environment.algolia.index.vacations_rentals + this.selectedLanguage;
    });

    this.cacheService.getBrands().subscribe(brands => {
      this.articleBrand = brands;
      if (this.articleBrand.length < 11) {
        this.buyCount = 12 - this.articleBrand.length;
      } else {
        this.buyCount = 0;
      }
      this.articleBrand1.splice(this.buyCount);
      for (var val of this.articleBrand) {
        this.articleBrand1.push(val);

      }

      var m = this.articleBrand1.length, t, i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = this.articleBrand1[m];
        this.articleBrand1[m] = this.articleBrand1[i];
        this.articleBrand1[i] = t;
      }
    });
  }
  ShowBtn(n: number): any[] {
    return Array(n);
  }
  onSearchChange(searchValue: string): void {
    this.searchValue = searchValue;
    if (searchValue) {
      this.showResult = true;
    } else {
      this.searchValue = '';
      this.showResult = false;
    }

  }

  @HostListener('window:click', ['$event.target'])
  onClick(targetElement: any) {
    if (targetElement && targetElement.className
      && (targetElement.className.baseVal
        && (targetElement.className.baseVal !== 'ais-SearchBox-input') || targetElement.className
        && (targetElement.className !== 'ais-SearchBox-input'))){
           document.getElementsByClassName('ais-SearchBox-submitIcon')[0].querySelectorAll("path")[0]["style"].fill="#cccc"
           this.showResult = false;
        }
      
  }
  @HostListener('window:keyup', ['$event.target'])
  onKeyup(targetElement: any) {
  if (targetElement && targetElement.className
    && targetElement.value
      && (targetElement.className.baseVal
        && (targetElement.className.baseVal === 'ais-SearchBox-input') || targetElement.className
        && (targetElement.className === 'ais-SearchBox-input'))){
        if(document.getElementsByClassName('ais-SearchBox-submitIcon') && document.getElementsByClassName('ais-SearchBox-submitIcon')[0]&& document.getElementsByClassName('ais-SearchBox-submitIcon')[0].querySelectorAll("path"))
            document.getElementsByClassName('ais-SearchBox-submitIcon')[0].querySelectorAll("path")[0]["style"].fill="#0079d0"
        }else{
          if(document.getElementsByClassName('ais-SearchBox-submitIcon') && document.getElementsByClassName('ais-SearchBox-submitIcon')[0]&& document.getElementsByClassName('ais-SearchBox-submitIcon')[0].querySelectorAll("path"))
            document.getElementsByClassName('ais-SearchBox-submitIcon')[0].querySelectorAll("path")[0]["style"].fill="#cccc"
        }
    
  }

  get searchParameters() {
    return {
      query: this.searchValue
    }
  }

}
