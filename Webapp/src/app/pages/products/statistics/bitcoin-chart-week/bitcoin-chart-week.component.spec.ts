import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinChartWeekComponent } from './bitcoin-chart-week.component';

describe('BitcoinChartWeekComponent', () => {
  let component: BitcoinChartWeekComponent;
  let fixture: ComponentFixture<BitcoinChartWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitcoinChartWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinChartWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
