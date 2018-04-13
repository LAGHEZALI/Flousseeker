import { NgModule } from '@angular/core';

import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@NgModule({
  imports: [
    LoadingBarRouterModule,
    LoadingBarHttpModule,
    LoadingBarHttpClientModule,
  ],
  exports: [
    LoadingBarRouterModule,
    LoadingBarHttpModule,
    LoadingBarHttpClientModule,
  ]
})
export class LoadingBarModule { }
