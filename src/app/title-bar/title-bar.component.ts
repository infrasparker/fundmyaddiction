import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {
  @Output() menuClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }
}
