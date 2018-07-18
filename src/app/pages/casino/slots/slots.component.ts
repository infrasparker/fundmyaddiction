import { Component, OnInit } from '@angular/core';
import { Player } from '../../../model/player/player.model';
import { PlayerService } from '../../../services/player/player.service';
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

  /**
   * @param playerService Injection of player service
   */
  constructor(private playerService: PlayerService) { }

  /**
   * Set initial player currency and validate bet requirements.
   * Subscribe to player service and update player and bet accordingly.
   * Ascertains that bet never exceeds current currency.
   */
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

  /**
   * Array of ValidatorFn objects to check against bet input.
   */
  private validationArr(): ValidatorFn[] {
    return [
      Validators.max(this.player.getCredits()),
      Validators.min(1)
    ];
  }

  /**
   * Generate 3 random values and compare them to determine prize.
   */
  onSlotsClick(): void {
    this.bet = Number(this.bet);
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
