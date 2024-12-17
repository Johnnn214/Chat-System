import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupadminComponent } from './groupadmin.component';

describe('GroupadminComponent', () => {
  let component: GroupadminComponent;
  let fixture: ComponentFixture<GroupadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupadminComponent]
    });
    fixture = TestBed.createComponent(GroupadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
