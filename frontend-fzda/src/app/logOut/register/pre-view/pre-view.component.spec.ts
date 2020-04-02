import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreViewComponent } from './pre-view.component';

describe('PreViewComponent', () => {
  let component: PreViewComponent;
  let fixture: ComponentFixture<PreViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
