import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouplistadminComponent } from './grouplistadmin.component';

describe('GrouplistadminComponent', () => {
  let component: GrouplistadminComponent;
  let fixture: ComponentFixture<GrouplistadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrouplistadminComponent]
    });
    fixture = TestBed.createComponent(GrouplistadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
