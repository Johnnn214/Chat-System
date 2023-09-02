import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperlistComponent } from './superlist.component';

describe('SuperlistComponent', () => {
  let component: SuperlistComponent;
  let fixture: ComponentFixture<SuperlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuperlistComponent]
    });
    fixture = TestBed.createComponent(SuperlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
