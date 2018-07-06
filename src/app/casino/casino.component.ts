import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.model';
/*
Select heads or tails
Enter amount to bet (numbers only)
Flip button - win = double lose = lose all
Top Right number updated
*/
@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css']
})
export class CasinoComponent implements OnInit {
  //@Output() onFlip = new EventEmitter;
  player: Player;
  private credits: number;
  private numBet: number;
  private heads:boolean = true;
  private message:string;

  constructor(private playerService: PlayerService) { 
    this.credits = playerService.player.getCredits();
  }
  
  onFlipClick(amount:number,heads:boolean): void {
    if(amount > this.credits){
      this.message = "you don't got that kinda cash tho";
    }
    else{
      this.numBet = amount;
      this.heads = heads;
      this.runBet();
    }
  }

  runBet(): void { //runs bet and returns new credit value
    let flip: number = Math.floor(Math.random() * 2); // 0  = tails , 1 = heads
    if( (flip == 1 && this.heads) || (flip == 0 && !this.heads) ){
      this.player.changeCredits(this.numBet);
      this.message = "HERE COMES THE MONEY"
    }
    else{
      this.player.changeCredits(-this.numBet);
      this.message = "REEEEEEEE"
    }
    this.credits = this.player.getCredits();
  }

  ngOnInit() {
    this.player = this.playerService.player;
    console.log(this.player);
    this.playerService.updated.subscribe((resp) => {
      this.player = resp;
      console.log(resp);
    })
  }

}
