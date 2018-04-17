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
    {title: 'TweetCoin 3D Globe', description: 'Experience the new way to view updated crurrency statistics via a 3D animated Globe',
      imgFileName: this.imgDir + 'globe.PNG', link: this.route + 'geoCurrencyGlobe'},
    {title: 'TweetCoin Ping', description: 'Take a look at where people aroud the world are talking about a currency',
      imgFileName: this.imgDir + 'planetary.PNG', link: this.route + 'geoCurrencyPings'},
    {title: 'Real Time Bitcoin', description: 'Get the latest value of the Bitcoin currency in real time !',
      imgFileName: this.imgDir + 'rtbt.PNG', link: this.route + 'realTimeBitcoin'},
    {title: 'Currency Converter', description: 'A Simple & quick Currency Conversion Tool.',
      imgFileName: this.imgDir + 'converter.PNG', link: this.route + 'currencyConverter'},
    {title: 'Satatistics & Annalisis', description: 'Explore our awesome financial charts',
      imgFileName: this.imgDir + 'stats.PNG', link: this.route + 'statistics'},
    {title: 'Prediction', description: 'Get the further estimated values of Bitcoin by our team',
      imgFileName: this.imgDir + 'prediction.PNG', link: this.route + 'prediction'}
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
