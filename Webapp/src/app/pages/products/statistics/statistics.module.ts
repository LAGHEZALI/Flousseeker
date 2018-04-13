import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';

import { StatisticsComponent } from './statistics.component';
import { SentimentChartComponent } from './sentiment-chart/sentiment-chart.component';
import { BitcoinChartComponent } from './bitcoin-chart/bitcoin-chart.component';
import { SentimentChartMonthComponent } from './sentiment-chart-month/sentiment-chart-month.component';
import { SentimentChartWeekComponent } from './sentiment-chart-week/sentiment-chart-week.component';
import { BitcoinChartWeekComponent } from './bitcoin-chart-week/bitcoin-chart-week.component';
import { BitcoinChartMonthComponent } from './bitcoin-chart-month/bitcoin-chart-month.component';

@NgModule({
  imports: [
    CommonModule,
    StatisticsRoutingModule
  ],
  declarations: [
    StatisticsComponent,
    SentimentChartComponent,
    BitcoinChartComponent,
    SentimentChartMonthComponent,
    SentimentChartWeekComponent,
    BitcoinChartWeekComponent,
    BitcoinChartMonthComponent
  ]
})
export class StatisticsModule { }
