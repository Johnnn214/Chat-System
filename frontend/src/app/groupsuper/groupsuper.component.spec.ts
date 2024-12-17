import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsuperComponent } from './groupsuper.component';

describe('GroupsuperComponent', () => {
  let component: GroupsuperComponent;
  let fixture: ComponentFixture<GroupsuperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsuperComponent]
    });
    fixture = TestBed.createComponent(GroupsuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
