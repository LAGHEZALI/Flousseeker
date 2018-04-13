import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EventHandlerService {

  private menuClickSource = new BehaviorSubject<any>(null);
  menuClickEvent = this.menuClickSource.asObservable();

  constructor() { }

  menuClickTriggered() {
    this.menuClickSource.next(null)
  }

}
