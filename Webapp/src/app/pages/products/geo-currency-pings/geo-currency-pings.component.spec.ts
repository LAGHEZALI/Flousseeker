import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoCurrencyPingsComponent } from './geo-currency-pings.component';

describe('GeoCurrencyPingsComponent', () => {
  let component: GeoCurrencyPingsComponent;
  let fixture: ComponentFixture<GeoCurrencyPingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoCurrencyPingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoCurrencyPingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
