import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypesPagesComponent } from './user-types-pages.component';

describe('UserTypesPagesComponent', () => {
  let component: UserTypesPagesComponent;
  let fixture: ComponentFixture<UserTypesPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypesPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypesPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
