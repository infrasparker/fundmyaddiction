import { Component, OnInit } from '@angular/core';
import { Player } from '../../player/player.model';
import { PlayerService } from '../../player/player.service';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {
  player: Player;
  bet: number;
  betFormControl: FormControl;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.player = this.playerService.player;
    this.betFormControl = new FormControl("", this.validationArr());
    this.playerService.updated.subscribe((resp: Player) => {
      this.player = resp;
      this.bet = Math.min(this.bet || 1, this.player.getCredits());
      this.betFormControl.setValidators(this.validationArr());
    })
  }

  private validationArr(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.max(this.player.getCredits()),
      Validators.min(1)
    ];
  }

  onSlotsClick(): void {
    let x: number = Math.floor(Math.random() * 100) - 40;
    this.playerService.addCredits(x);
  }

}
