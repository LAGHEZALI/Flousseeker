import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ConverterService } from '../../../shared/services/converter.service';

import { EventHandlerService } from "../../../shared/services/event-handler.service";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  valueBTC = 'Loading . . .';
  nameCurr = '';
  nameCurrTemp = '';

  currency = [
    {name: 'Australian Dollar'  , value: 'AUD'},
    {name: 'British Pound'      , value: 'GBP'},
    {name: 'Chinese Yuan'       , value: 'CNY'},
    {name: 'Dollar'             , value: 'USD'},
    {name: 'Euro'               , value: 'EUR'},
    {name: 'Indian Rupee'       , value: 'INR'},
    {name: 'Japanese Yen'       , value: 'JPY'},
    {name: 'MAD'                , value: 'MAD'},
    {name: 'Russian Ruble'      , value: 'RUB'}

  ];

  constructor(
                private stepService: EventHandlerService,
                private _formBuilder: FormBuilder,
                private converterService: ConverterService
              ) {
                stepService.setstep(3);
              }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  public getBtcValue() {
    const currencyValue: string = JSON.stringify(this.firstFormGroup.value.firstCtrl);
    const currencyName: string = JSON.stringify(this.secondFormGroup.value.secondCtrl.value).substr(1, 3);
    this.valueBTC = 'Loading . . .';
    this.nameCurrTemp = currencyName;
    this.nameCurr = '';
    this.getResult(currencyName, currencyValue);
  }

  getResult(name: string, value: string): void {
    this.converterService.getBtcValue(value, name)
      .subscribe(
        result => {
          this.valueBTC =  Number(result.value).toFixed(2);
          this.nameCurr = this.nameCurrTemp;
        },
        error => console.log('Error :: ' + error)
      );
  }

}
