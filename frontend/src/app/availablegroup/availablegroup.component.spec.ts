import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablegroupComponent } from './availablegroup.component';

describe('AvailablegroupComponent', () => {
  let component: AvailablegroupComponent;
  let fixture: ComponentFixture<AvailablegroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailablegroupComponent]
    });
    fixture = TestBed.createComponent(AvailablegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
