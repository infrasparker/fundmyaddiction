import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/services/player/player.service';
import { Player } from 'src/app/services/player/player.model';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {
  @Output() menuClick = new EventEmitter();
  player: Player;
  endVal: number;

  constructor(private playerService: PlayerService) {
    this.player = this.playerService.player;
    this.endVal = this.player.getCredits();
  }

  ngOnInit() {
    this.playerService.updated.subscribe((resp: Player) => {
      this.endVal = resp.getCredits();
      this.player = resp;
    });
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }
}