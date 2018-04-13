import { Component, OnInit, AfterViewInit} from '@angular/core';

import '../../../../../assets/js/statistics/runSentimentChart.js';
declare var runSentimentChartObject: any;

@Component({
  selector: 'app-sentiment-chart',
  templateUrl: './sentiment-chart.component.html',
  styleUrls: ['./sentiment-chart.component.scss']
})
export class SentimentChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    runSentimentChartObject.init('day');
  }
}
