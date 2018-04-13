import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import { EventHandlerService } from "../../services/event-handler.service";
import {MatStepper} from "@angular/material";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  logoSize = ' fa-2x';

  links = [
    {title: 'Home'          , logoName: 'fas fa-home'+this.logoSize       , value: '/home'},
    {title: 'Our Products'  , logoName: 'fab fa-btc'+this.logoSize        , value: '/products'},
    {title: 'About Us'   , logoName: 'fas fa-building'+this.logoSize   , value: '/aboutus'},
    {title: 'Contact'       , logoName: 'fas fa-users'+this.logoSize      , value: '/contact'}
  ]

  constructor(private click: EventHandlerService) {}

  ngOnInit() {
    this.click.menuClickEvent.subscribe(()=>{
      this.onToggle();
    })
  }

  onToggle() {
    this.sidenav.toggle()
  }
}
