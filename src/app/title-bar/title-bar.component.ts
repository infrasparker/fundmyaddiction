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
  from: number;
  to: number;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.player = this.playerService.player;
    this.playerService.updated.subscribe((resp: Player) => {
      this.from = this.player.getCredits();
      this.to = resp.getCredits();
      this.player = resp;
    })
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }
}
