import { Component, EventEmitter, Output, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThemeConstantService } from '../../services/theme-constant.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent {
  date = new Date();
  constructor(
    public translate: TranslateService
  ) {

  }

}
