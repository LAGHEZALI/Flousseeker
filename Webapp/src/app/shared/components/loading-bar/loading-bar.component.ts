import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from "@ngx-loading-bar/core";

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {

  constructor(
    public loader: LoadingBarService
  ) { }

  ngOnInit() {
  }

}
