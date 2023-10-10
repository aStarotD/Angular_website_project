import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeConstantService } from 'src/app/shared/services/theme-constant.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  constructor(
    private router: Router,
    public translate: TranslateService,
    private themeService: ThemeConstantService,
    public authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
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
          this.authService.redirectToConsole(`${environment.consoleURL}/campaign/buy-search-engine`, {})
        } else {
          this.router.navigate(["/app/campaign/buy-search-engine"]);
        }
      } else {
        this.showModal()
      }
    });
  }
}
