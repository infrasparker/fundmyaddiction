import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  
  @Output() sliderClick = new EventEmitter();
  navButton: string;
  
  constructor() { 
    this.navButton = "navigate_next";
  }
  
  ngOnInit() {
  }

  onSliderClick() {
    this.sliderClick.emit();
    if(this.navButton == "navigate_before"){
      this.navButton = "navigate_next";
    }
    else{
      this.navButton = "navigate_before";
    }
  }
}
