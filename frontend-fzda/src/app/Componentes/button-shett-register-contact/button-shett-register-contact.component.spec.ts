import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonShettRegisterContactComponent } from './button-shett-register-contact.component';

describe('ButtonShettRegisterContactComponent', () => {
  let component: ButtonShettRegisterContactComponent;
  let fixture: ComponentFixture<ButtonShettRegisterContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonShettRegisterContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonShettRegisterContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
