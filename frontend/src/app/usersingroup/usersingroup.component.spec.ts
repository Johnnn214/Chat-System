import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersingroupComponent } from './usersingroup.component';

describe('UsersingroupComponent', () => {
  let component: UsersingroupComponent;
  let fixture: ComponentFixture<UsersingroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersingroupComponent]
    });
    fixture = TestBed.createComponent(UsersingroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
