import { ComponentFixture, TestBed } from '@angular/core/testing';

import { 500Component } from './500.component';

describe('500Component', () => {
  let component: 500Component;
  let fixture: ComponentFixture<500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [500Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
