import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  @Output() sliderCloseClick = new EventEmitter();
  private navButton: string;
  constructor() {
    this.navButton = "navigate_next";
  }

  ngOnInit() {
  }

  onSliderCloseClick() {
    this.sliderCloseClick.emit();
  }
}
