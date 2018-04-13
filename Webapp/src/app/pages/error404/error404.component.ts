import { Component, OnInit, AfterViewInit } from '@angular/core';

import '../../../assets/js/404/matrix.js';

declare var errorObject: any;

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    errorObject.init();
  }
}
