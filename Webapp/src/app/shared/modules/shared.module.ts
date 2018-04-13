import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { LoadingBarModule } from './loading-bar/loading-bar.module';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { LoadingBarComponent } from '../components/loading-bar/loading-bar.component';

import { HeaderMenuComponent } from '../components/header-menu/header-menu.component';
import { SideNavComponent } from '../components/side-nav/side-nav.component';
import { FooterComponent } from '../components/footer/footer.component';

import {EventHandlerService} from '../services/event-handler.service';
import {PingPlanetaryService} from '../services/ping-planetary.service';
import {RtBtcService} from '../services/rt-btc.service';
import { ConverterService } from '../services/converter.service';

const config: SocketIoConfig = { url: 'http://localhost:8085', options: {} };

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    LoadingBarModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    LoadingBarComponent,
    HeaderMenuComponent,
    SideNavComponent,
    FooterComponent
  ],
  providers: [
    EventHandlerService,
    PingPlanetaryService,
    RtBtcService,
    ConverterService
  ],
  exports: [
    MaterialModule,
    LoadingBarModule,
    SocketIoModule,
    LoadingBarComponent,
    HeaderMenuComponent,
    SideNavComponent,
    FooterComponent
  ],
})
export class SharedModule { }
