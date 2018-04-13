import { Component, OnInit, AfterViewInit} from '@angular/core';

import '../../../../../assets/js/statistics/runBitcoinChart.js';
declare var runBitcoinChartObject: any;

@Component({
  selector: 'app-bitcoin-chart-month',
  templateUrl: './bitcoin-chart-month.component.html',
  styleUrls: ['./bitcoin-chart-month.component.scss']
})
export class BitcoinChartMonthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    runBitcoinChartObject.init('month');
  }

}
