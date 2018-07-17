import { Component, OnInit } from '@angular/core';
import { Player } from '../../services/player/player.model';
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  player: Player;

  constructor(private playerService: PlayerService) {
    this.player = playerService.player;
  }

  ngOnInit() {
    this.playerService.updated.subscribe((resp: Player) => {
      this.player = resp;
    });
  }

}
