import { Component, OnInit, AfterViewInit} from '@angular/core';

import '../../../../../assets/js/statistics/runBitcoinChart.js';
declare var runBitcoinChartObject: any;

@Component({
  selector: 'app-bitcoin-chart',
  templateUrl: './bitcoin-chart.component.html',
  styleUrls: ['./bitcoin-chart.component.scss']
})
export class BitcoinChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    runBitcoinChartObject.init('day');
  }

}
