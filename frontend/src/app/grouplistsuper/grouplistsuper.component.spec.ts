import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouplistsuperComponent } from './grouplistsuper.component';

describe('GrouplistsuperComponent', () => {
  let component: GrouplistsuperComponent;
  let fixture: ComponentFixture<GrouplistsuperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrouplistsuperComponent]
    });
    fixture = TestBed.createComponent(GrouplistsuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
