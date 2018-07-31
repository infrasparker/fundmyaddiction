import { Component, OnInit, EventEmitter } from '@angular/core';
import { InventoryService, ItemContainer } from '../../../services/inventory/inventory.service'
import { PlayerService } from '../../../services/player/player.service';
import { Player } from '../../../model/player/player.model';
import { Item } from '../../../model/item/item.model';
import { Weapon } from '../../../model/item/weapon.model';
import { Armor } from '../../../model/item/armor.model';
import { ItemComponent } from '../../../model/item/item.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-loot-crates',
  templateUrl: './loot-crates.component.html',
  styleUrls: ['./loot-crates.component.css']
})
export class LootCratesComponent implements OnInit {

  private player: Player;
  private bought = new EventEmitter();
  private errorMessage: String;
  private items = [ [new Item("Crate 1", "Crate desc", 5, 5), //tier 1
                    new Item("Crate 2", "Crate desc", 5, 5), 
                    new Item("Crate 3", "Crate desc", 5, 5), 
                    new Item("Crate 4", "Crate desc", 5, 5), 
                    new Item("Crate 5", "Crate desc", 5, 5)],
                    [new Item("Crate 6", "Crate desc", 5, 5), //tier 2
                    new Item("Crate 7", "Crate desc", 5, 5), 
                    new Item("Crate 8", "Crate desc", 5, 5), 
                    new Item("Crate 9", "Crate desc", 5, 5), 
                    new Item("Crate 10", "Crate desc", 5, 5)], 
                    [new Item("Crate 11", "Crate desc", 5, 5), //tier 3
                    new Item("Crate 12", "Crate desc", 5, 5), 
                    new Item("Crate 13", "Crate desc", 5, 5), 
                    new Item("Crate 14", "Crate desc", 5, 5), 
                    new Item("Crate 15", "Crate desc", 5, 5)] ]



  constructor(private playerService: PlayerService, private inventoryService: InventoryService, private dialog: MatDialog) { }

  onCrateClick(tier:number) {
    if (50 * tier > this.player.getCredits()) {
      this.errorMessage = "Insufficient Funds!"
      return;
    }
    this.playerService.addCredits(-50 * tier);
    let items = this.items[tier - 1];
    let rng = [Math.floor(Math.random()*items.length), Math.floor(Math.random()*items.length), Math.floor(Math.random()*items.length)]
    this.inventoryService.addItem(items[rng[0]]);
    this.inventoryService.addItem(items[rng[1]]);
    this.inventoryService.addItem(items[rng[2]]);
    let containers = [new ItemContainer(items[rng[0]], 1), new ItemContainer(items[rng[1]], 1), new ItemContainer(items[rng[2]], 1)];
    this.popUp(containers);
  }

  popUp(containers: ItemContainer[]) {
    for (let container of containers) {
      const dialogRef = this.dialog.open(ItemComponent, {
        width: '480px',
        height: '600px',
        data: container.item
      });
    }

  }

  ngOnInit() {
    this.player = this.playerService.player;
    this.playerService.updated.subscribe((resp: Player) => {
      this.player = resp;
    })
  }

}
