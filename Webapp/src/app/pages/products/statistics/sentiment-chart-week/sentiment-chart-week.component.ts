import { Component, OnInit, AfterViewInit} from '@angular/core';

import '../../../../../assets/js/statistics/runSentimentChart.js';
declare var runSentimentChartObject: any;

@Component({
  selector: 'app-sentiment-chart-week',
  templateUrl: './sentiment-chart-week.component.html',
  styleUrls: ['./sentiment-chart-week.component.scss']
})
export class SentimentChartWeekComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    runSentimentChartObject.init('week');
  }

}
