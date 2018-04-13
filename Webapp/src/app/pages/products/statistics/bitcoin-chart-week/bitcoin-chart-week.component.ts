import { Component, OnInit, AfterViewInit} from '@angular/core';

import '../../../../../assets/js/statistics/runBitcoinChart.js';
declare var runBitcoinChartObject: any;

@Component({
  selector: 'app-bitcoin-chart-week',
  templateUrl: './bitcoin-chart-week.component.html',
  styleUrls: ['./bitcoin-chart-week.component.scss']
})
export class BitcoinChartWeekComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    runBitcoinChartObject.init('week');
  }

}
