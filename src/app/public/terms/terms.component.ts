import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SeoService } from 'src/app/shared/services/seo/seo.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  private termsAndCondDoc = "terms_and_conditions";

  constructor(
    public translate: TranslateService,
    private seoService: SeoService,
    private language: LanguageService,
  ) { }

  ngOnInit(): void {
    this.seoService.updateTagsWithData(this.termsAndCondDoc);
  }
}
