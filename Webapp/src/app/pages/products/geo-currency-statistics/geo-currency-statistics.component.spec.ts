import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoCurrencyStatisticsComponent } from './geo-currency-statistics.component';

describe('GeoCurrencyStatisticsComponent', () => {
  let component: GeoCurrencyStatisticsComponent;
  let fixture: ComponentFixture<GeoCurrencyStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoCurrencyStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoCurrencyStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
