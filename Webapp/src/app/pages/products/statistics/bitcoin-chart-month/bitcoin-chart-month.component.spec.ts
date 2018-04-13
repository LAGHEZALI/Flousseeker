import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinChartMonthComponent } from './bitcoin-chart-month.component';

describe('BitcoinChartMonthComponent', () => {
  let component: BitcoinChartMonthComponent;
  let fixture: ComponentFixture<BitcoinChartMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitcoinChartMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinChartMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
