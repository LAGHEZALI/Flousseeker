import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentChartWeekComponent } from './sentiment-chart-week.component';

describe('SentimentChartWeekComponent', () => {
  let component: SentimentChartWeekComponent;
  let fixture: ComponentFixture<SentimentChartWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentimentChartWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimentChartWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
