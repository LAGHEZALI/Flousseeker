import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsComponent } from './statistics.component';
import { BitcoinChartComponent } from './bitcoin-chart/bitcoin-chart.component';
import { SentimentChartComponent } from './sentiment-chart/sentiment-chart.component';
import { SentimentChartMonthComponent } from './sentiment-chart-month/sentiment-chart-month.component';
import { SentimentChartWeekComponent } from './sentiment-chart-week/sentiment-chart-week.component';
import { BitcoinChartWeekComponent } from './bitcoin-chart-week/bitcoin-chart-week.component';
import { BitcoinChartMonthComponent } from './bitcoin-chart-month/bitcoin-chart-month.component';

const routes: Routes = [
  {
    path: 'products/statistics',
    component: StatisticsComponent,
    children: [
      {
        path: 'sentiment/day',
        component: SentimentChartComponent
      },
      {
        path: 'sentiment/week',
        component: SentimentChartWeekComponent
      },
      {
        path: 'sentiment/month',
        component: SentimentChartMonthComponent
      },
      {
        path: 'bitcoin/day',
        component: BitcoinChartComponent,
      },
      {
        path: 'bitcoin/week',
        component: BitcoinChartWeekComponent,
      },
      {
        path: 'bitcoin/month',
        component: BitcoinChartMonthComponent,
      },
      { path: '',   redirectTo: '/products/statistics/sentiment/day', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
