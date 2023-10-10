import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTypesPagesComponent } from './user-types-pages.component';


const routes: Routes = [
  {
    path: '',
    component: UserTypesPagesComponent,
    data: {
      title: '',
      headerDisplay: 'none'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTypesPagesRoutingModule { }
