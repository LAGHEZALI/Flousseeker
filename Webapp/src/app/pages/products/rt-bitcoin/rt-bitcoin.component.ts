import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { RtBtcService } from '../../../shared/services/rt-btc.service';

@Component({
  selector: 'app-rt-bitcoin',
  templateUrl: './rt-bitcoin.component.html',
  styleUrls: ['./rt-bitcoin.component.scss'],
  providers : [RtBtcService]
})
export class RtBitcoinComponent implements OnInit {

  public value = 0.0;
  public observable: Observable<boolean>;
  private observer: Observer<boolean>;

  constructor(private rtBtcService: RtBtcService) {
    this.observable = new Observable<boolean>((observer: any) => this.observer = observer).share();
    setTimeout(() => this.observer.next(true), 0);
  }

  public changeTo(newValue: number) {
    this.value = newValue;
    setTimeout(() => this.observer.next(true), 0);
  }

  ngOnInit() {

    this.getInitValue();

    this.rtBtcService
      .getValue()
      .subscribe(msg => {
        this.changeTo(Number(msg));
      });
  }

  getInitValue(): void {
    this.rtBtcService.getInitValue()
      .subscribe(
        result => {
          this.changeTo(Number(result.value));
        },
        error => console.log('Error :: ' + error)
      );
  }

}
