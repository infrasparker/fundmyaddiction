import { Component, OnInit } from '@angular/core';
import { Player } from '../../player/player.model';
import { PlayerService } from '../../player/player.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {
  player: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.player = this.playerService.player;
    this.playerService.updated.subscribe((resp: Player) => {
      this.player = resp;
    })
  }

  onSlotsClick(): void {
    this.playerService.addCredits(Math.random() * 100 - 40);
  }

}
