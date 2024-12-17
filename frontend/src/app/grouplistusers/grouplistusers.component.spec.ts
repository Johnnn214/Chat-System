import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouplistusersComponent } from './grouplistusers.component';

describe('GrouplistusersComponent', () => {
  let component: GrouplistusersComponent;
  let fixture: ComponentFixture<GrouplistusersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrouplistusersComponent]
    });
    fixture = TestBed.createComponent(GrouplistusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
