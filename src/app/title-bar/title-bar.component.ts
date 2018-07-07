import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.model';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {
  @Output() menuClick = new EventEmitter();
  player: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.player = this.playerService.player;
    console.log(this.player);
    this.playerService.updated.subscribe((resp) => {
      this.player = resp;
      console.log(resp);
    })
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }
}