import { Injectable, EventEmitter } from '@angular/core';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  player: Player;
  updated: EventEmitter<Player> = new EventEmitter<Player>();

  constructor() {
    this.player = new Player("Roland Peone", 100);
  }

  addCredits(credits: number): void {
    this.player.changeCredits(credits);
    this.updated.emit(this.player);
  }
}
