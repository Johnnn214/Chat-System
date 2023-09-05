import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupadminlistComponent } from './groupadminlist.component';

describe('GroupadminlistComponent', () => {
  let component: GroupadminlistComponent;
  let fixture: ComponentFixture<GroupadminlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GroupadminlistComponent]
    });
    fixture = TestBed.createComponent(GroupadminlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
