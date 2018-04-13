import { Component, OnInit, AfterViewInit  } from '@angular/core';

import { PingPlanetaryService } from '../../../shared/services/ping-planetary.service';

import '../../../../assets/js/planetaryjs/run.js';
declare var planetaryObject: any;

@Component({
  selector: 'app-geo-currency-pings',
  templateUrl: './geo-currency-pings.component.html',
  styleUrls: ['./geo-currency-pings.component.scss'],
  providers : [PingPlanetaryService]
})
export class GeoCurrencyPingsComponent implements OnInit {

  constructor(private pingPlanetaryService: PingPlanetaryService) {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    planetaryObject.init();
  }
}
