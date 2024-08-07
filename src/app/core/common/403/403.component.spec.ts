import { ComponentFixture, TestBed } from '@angular/core/testing';

import { 403Component } from './403.component';

describe('403Component', () => {
  let component: 403Component;
  let fixture: ComponentFixture<403Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [403Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
