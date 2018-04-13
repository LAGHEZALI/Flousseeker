import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentChartMonthComponent } from './sentiment-chart-month.component';

describe('SentimentChartMonthComponent', () => {
  let component: SentimentChartMonthComponent;
  let fixture: ComponentFixture<SentimentChartMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentimentChartMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentChartMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
