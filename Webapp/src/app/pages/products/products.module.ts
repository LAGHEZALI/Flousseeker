import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/modules/shared.module';

import { Ng2OdometerModule } from 'ng2-odometer';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';
import { GeoCurrencyStatisticsComponent } from './geo-currency-statistics/geo-currency-statistics.component';
import { GeoCurrencyPingsComponent } from './geo-currency-pings/geo-currency-pings.component';
import { RtBitcoinComponent } from './rt-bitcoin/rt-bitcoin.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';

import { StatisticsModule } from './statistics/statistics.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    Ng2OdometerModule.forRoot(),
    StatisticsModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductsComponent,
    GeoCurrencyStatisticsComponent,
    GeoCurrencyPingsComponent,
    RtBitcoinComponent,
    CurrencyConverterComponent
  ]
})

export class ProductsModule { }
