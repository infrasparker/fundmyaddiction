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
  result: string;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.player = this.playerService.player;
    this.betFormControl = new FormControl("", this.validationArr());
    this.result = "";
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
    this.result = "";
    this.playerService.addCredits(-this.bet);
    for (let n: number = 0; n < 3; n++) {
      this.result += Math.floor(Math.random() * 10);
    }
    if (this.result[0] === this.result[1] && this.result[1] === this.result[2])
      this.playerService.addCredits(this.bet * 10);
    else if (this.result[0] === this.result[1] || this.result[1] === this.result[2] || this.result[0] === this.result[2])
      this.playerService.addCredits(this.bet * 5);
  }

}
