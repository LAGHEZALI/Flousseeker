import { Component, OnInit, AfterViewInit } from '@angular/core';

import '../../../../assets/js/webgl/run.js'

declare var webGlObject: any;

@Component({
  selector: 'app-geo-currency-statistics',
  templateUrl: './geo-currency-statistics.component.html',
  styleUrls: ['./geo-currency-statistics.component.scss']
})
export class GeoCurrencyStatisticsComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    webGlObject.init();
  }
}
