import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import * as algoliasearch from 'algoliasearch/lite';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';

const searchClient = algoliasearch(
  environment.algolia.applicationId,
  environment.algolia.apiKey
);

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})

export class CompaniesComponent implements OnInit {
  config = {
    indexName: environment.algolia.index.companies,
    searchClient,
    routing: true
  };
  loading: boolean = true;
  selectedLanguage: string = "";

  constructor(
    private langService: LanguageService,
    private router: Router,
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.selectedLanguage = this.langService.getSelectedLanguage();

    this.config.indexName = this.config.indexName + this.selectedLanguage;
  }

  isVisible = false;
  isOkLoading = false;
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.router.navigate(["auth/login"]);
      this.isOkLoading = false;
    }, 2000);
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  checkLogin(){
    this.authService.getAuthState().subscribe(async (user) => {
      if (!user.isAnonymous) {
        if(this.userService.userData?.isNewConsoleUser) {
          this.authService.redirectToConsole(`${environment.consoleURL}/company/company-list`, {})
        } else {
          this.router.navigate(["/app/company/company-list"]);
        }
      } else {
        this.showModal()
      }
    });
  }
}
