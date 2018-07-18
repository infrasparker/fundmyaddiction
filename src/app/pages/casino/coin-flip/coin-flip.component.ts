import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../../services/player/player.service';
import { Player } from '../../../model/player/player.model';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-coin-flip',
  templateUrl: './coin-flip.component.html',
  styleUrls: ['./coin-flip.component.css']
})

export class CoinFlipComponent implements OnInit {

  /* 
   * Coin Flip
   * Select heads or tails.
   * Enter amount to bet (numbers only).
   * Win doubles your bet. Loss loses your bet.
   * Top right credits updated.
   */

  player: Player;
  bet: number; //user inputed amount of credits to be bet
  result: string; //display message after a bet
  betFormControl: FormControl;

  /**
   * @param playerService Injection of player service
   */
  constructor(private playerService: PlayerService) {
    this.result = "";
  }
  
  /** 
   * Runs when either the heads or tails button is clicked.
   * Generates a random number between 0 and 1 inclusive.
   * 0 represents tails, 1 represents heads.
   * The player's credits are updated accordingly if the bet is won or lost.
   * Corresponding message is displayed.
   * @param heads True if the player picked heads, false if not.
   */ 
  onFlipClick(heads: boolean) {
    this.bet = Number(this.bet);
    this.result = (Math.floor(Math.random() * 2) === 1) ? "heads" : "tails"; // 0  = tails , 1 = heads
    if ((this.result === "heads" && heads) || (this.result === "tails" && !heads))
      this.playerService.addCredits(this.bet);
    else
      this.playerService.addCredits(-this.bet);
  }

  /**
   * Set initial player currency and validate bet requirements.
   * Subscribe to player service and update player and bet accordingly.
   * Ascertains that bet never exceeds current currency.
   */
  ngOnInit() {
    this.player = this.playerService.player;
    this.betFormControl = new FormControl("", this.validationArr());
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

}
