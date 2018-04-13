import { Component, OnInit, ViewChild } from '@angular/core';

import { EventHandlerService } from "../../shared/services/event-handler.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('stepper') stepper;

  private step:number = 0;

  constructor(private stepService: EventHandlerService) { 
    this.step = this.stepService.getstep();
  }

  complete = true;

  imgDir = '../../assets/images/products/';
  route = '/products/';

  myProducts = [
    {title: '3D Globe', description: 'Experience the new way to view updated crurrency statistics via a 3D animated Globe',
      imgFileName: this.imgDir + 'globe.PNG', link: this.route + 'geoCurrencyGlobe'},
    {title: 'Twitter Pings', description: 'Take a look at where people aroud the world are talking about a currency',
      imgFileName: this.imgDir + 'planetary.PNG', link: this.route + 'geoCurrencyPings'},
    {title: 'Real TIme Bitcoin', description: 'Get the latest value of the Bitcoin currency in real time !',
      imgFileName: this.imgDir + 'rtbt.PNG', link: this.route + 'realTimeBitcoin'},
    {title: 'Currency Converter', description: 'A Simple & quick Currency Conversion Tool.',
      imgFileName: this.imgDir + 'converter.PNG', link: this.route + 'currencyConverter'},
    {title: 'Satatistics & Annalisis', description: 'Explore our awesome financial charts',
      imgFileName: this.imgDir + 'stats.PNG', link: this.route + 'statistics'}
  ];

  ngOnInit() {
    this.stepper.selectedIndex = this.step;
  }

  updateStep(event) {
    setTimeout(() =>  {
      this.stepService.setstep(this.stepper.selectedIndex);
    }, 100);
  }

}
