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
  endVal: number;

  constructor(private playerService: PlayerService) {
    this.player = this.playerService.player;
    this.endVal = this.player.getCredits();
  }

  ngOnInit() {
<<<<<<< HEAD
    this.playerService.updated.subscribe((resp: Player) => {
      this.endVal = resp.getCredits();
      this.player = resp;
    });
=======
    this.player = this.playerService.player;
    console.log(this.player);
    this.playerService.updated.subscribe((resp) => {
      this.player = resp;
      console.log(resp);
    })
>>>>>>> coin_flip
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }
}