import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ConverterService } from '../../../shared/services/converter.service';

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

  constructor(private _formBuilder: FormBuilder, private converterService: ConverterService) { }

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
    this.getResult(currencyName, currencyValue);
  }

  getResult(name: string, value: string): void {
    this.converterService.getBtcValue(value, name)
      .subscribe(
        result => {
          this.valueBTC =  Number(result.value).toFixed(2);
        },
        error => console.log('Error :: ' + error)
      );
  }

}
