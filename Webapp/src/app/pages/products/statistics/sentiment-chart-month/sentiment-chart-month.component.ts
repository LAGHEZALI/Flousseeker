import { Component, OnInit, AfterViewInit} from '@angular/core';

import '../../../../../assets/js/statistics/runSentimentChart.js';
declare var runSentimentChartObject: any;

@Component({
  selector: 'app-sentiment-chart-month',
  templateUrl: './sentiment-chart-month.component.html',
  styleUrls: ['./sentiment-chart-month.component.scss']
})
export class SentimentChartMonthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    runSentimentChartObject.init('month');
  }

}
