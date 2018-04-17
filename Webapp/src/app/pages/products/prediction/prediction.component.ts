import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';


import '../../../../assets/js/prediction/run.js';
declare var predictionObject: any;


@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {

  public value:number = 8015.85;
  public observable: Observable<boolean>;
  private observer: Observer<boolean>;

  constructor() {this.observable = new Observable<boolean>((observer: any) => this.observer = observer).share();
    setTimeout(() => this.observer.next(true), 0);
  }

  public changeTo(newValue: number) {
    this.value = newValue;
    setTimeout(() => this.observer.next(true), 0);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    predictionObject.init();
    document.getElementById('btn-min').setAttribute("style", "background-color: orange;");
  }

  changeForMinute() {
    document.getElementById('btn-min').setAttribute("style", "background-color: orange;");
    document.getElementById('btn-day').setAttribute("style", "background-color: rgb(253,216,53);");
    document.getElementById('btn-wek').setAttribute("style", "background-color: rgb(253,216,53);");
    document.getElementById('btn-mnt').setAttribute("style", "background-color: rgb(253,216,53);");
    this.changeTo(8015.85);
  }

  changeForDay() {
    document.getElementById('btn-min').setAttribute("style", "background-color: rgb(253,216,53);;");
    document.getElementById('btn-day').setAttribute("style", "background-color: orange;");
    document.getElementById('btn-wek').setAttribute("style", "background-color: rgb(253,216,53);");
    document.getElementById('btn-mnt').setAttribute("style", "background-color: rgb(253,216,53);");
    this.changeTo(7952.52);
  }

  changeForWeek() {
    document.getElementById('btn-min').setAttribute("style", "background-color: rgb(253,216,53);;");
    document.getElementById('btn-day').setAttribute("style", "background-color: rgb(253,216,53);");
    document.getElementById('btn-wek').setAttribute("style", "background-color: orange;");
    document.getElementById('btn-mnt').setAttribute("style", "background-color: rgb(253,216,53);");
    this.changeTo(0.00);
  }

  changeForMonth() {
    document.getElementById('btn-min').setAttribute("style", "background-color: rgb(253,216,53);;");
    document.getElementById('btn-day').setAttribute("style", "background-color: rgb(253,216,53);");
    document.getElementById('btn-wek').setAttribute("style", "background-color: rgb(253,216,53);");
    document.getElementById('btn-mnt').setAttribute("style", "background-color: orange;");
    this.changeTo(0.0);
  }

}
