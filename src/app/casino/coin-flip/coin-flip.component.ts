import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../player/player.service';
import { Player } from '../../player/player.model';
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

  @Output() onFlip = new EventEmitter;
  player: Player;
  private numBet: number; //user inputed amount of credits to be bet
  private heads: boolean; //true if the user selected heads, false if not
  private message: string; //display message after a bet
  betFormControl: FormControl;

  /**
   * @param playerService Injection of player service
   */
  constructor(private playerService: PlayerService) { }
  
  /** 
   * Runs when either the heads or tails button is clicked.
   * Checks if there are enough credits to run the bet.
   * If so, the bet is executed.
   * @param heads True if the player picked heads, false if not.
   */ 
  onFlipClick(heads: boolean) {
    if(this.numBet > this.player.getCredits()){
      this.message = "Insufficent Funds!";
    }
    else{
      this.onFlip.emit();
      this.heads = heads;
      this.runBet();
    }
  }

  /**
   * Generates a random number between 0 and 1 inclusive.
   * 0 represents tails, 1 represents heads.
   * The player's credits are updated accordingly if the bet is won or lost.
   * Corresponding message is displayed.
   */
  runBet() { 
    let flip: number = Math.floor(Math.random() * 2); // 0  = tails , 1 = heads
    if( (flip == 1 && this.heads) || (flip == 0 && !this.heads) ){
      this.playerService.addCredits(this.numBet);
      this.message = "You Win!";
    }
    else{
      this.playerService.addCredits(-this.numBet);
      this.message = "You Lost!";
    }
  }

  /**
   * Set initial player currency and validate bet requirements.
   * Subscribe to player service and update player and bet accordingly.
   * Ascertains that bet never exceeds current currency.
   */
  ngOnInit() {
    this.player = this.playerService.player;
    this.betFormControl = new FormControl("", this.validationArr());
    this.playerService.updated.subscribe((resp) => {
      this.player = resp;
      this.numBet = Math.min(this.numBet || 1, this.player.getCredits());
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
