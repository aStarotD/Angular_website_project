import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

//import { SearchEngineComponent } from './search-engine.component';

import { createTranslateLoader } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { NgAisModule } from 'angular-instantsearch';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
//import { SearchEngineRoutingModule } from './search-engine-routing.module';
import { UserTypesPagesRoutingModule } from './user-types-pages-routing.module';
import { UserTypesPagesComponent } from './user-types-pages.component';
import { NzTabsModule } from "ng-zorro-antd";

@NgModule({
  declarations: [
    UserTypesPagesComponent
  ],
  imports: [
    CloudinaryModule.forRoot({ Cloudinary }, { cloud_name: 'mytrendingstories' } as CloudinaryConfiguration),
    CommonModule,
    NzTabsModule,
    NgAisModule.forRoot(),
    UserTypesPagesRoutingModule,
    TranslateModule.forChild({ useDefaultLang: true, isolate: false, loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] } }),
  ]
})

export class UserTypesPagesModule { }
