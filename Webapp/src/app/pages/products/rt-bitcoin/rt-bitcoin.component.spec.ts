import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtBitcoinComponent } from './rt-bitcoin.component';

describe('RtBitcoinComponent', () => {
  let component: RtBitcoinComponent;
  let fixture: ComponentFixture<RtBitcoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtBitcoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtBitcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
