import {Component, OnInit} from '@angular/core';
import { EventHandlerService } from "../../services/event-handler.service";

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {

  constructor(private click: EventHandlerService) { }

  ngOnInit() {}

  toggle() {
    this.click.menuClickTriggered();
  }
}
