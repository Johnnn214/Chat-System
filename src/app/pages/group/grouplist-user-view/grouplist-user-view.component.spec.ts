import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouplistUserViewComponent } from './grouplist-user-view.component';

describe('GrouplistUserViewComponent', () => {
  let component: GrouplistUserViewComponent;
  let fixture: ComponentFixture<GrouplistUserViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GrouplistUserViewComponent]
    });
    fixture = TestBed.createComponent(GrouplistUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
