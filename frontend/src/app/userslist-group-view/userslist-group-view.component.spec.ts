import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserslistGroupViewComponent } from './userslist-group-view.component';

describe('UserslistGroupViewComponent', () => {
  let component: UserslistGroupViewComponent;
  let fixture: ComponentFixture<UserslistGroupViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserslistGroupViewComponent]
    });
    fixture = TestBed.createComponent(UserslistGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
