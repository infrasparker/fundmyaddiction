import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemContainer, InventoryService } from '../../../services/inventory/inventory.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Item } from '../../../model/item/item.model';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../../../model/item/item.component';
import { PlayerService } from '../../../services/player/player.service';
import { Player } from '../../../model/player/player.model';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  private player: Player;

  // Control Pop Up - Semaphore
  private sellClick: boolean = false;

  displayedColumns: string[];
  dataSource: MatTableDataSource<ItemContainer>;

  selectedItem: Item;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private inventoryService: InventoryService, private dialog: MatDialog, private playerService: PlayerService) {
    this.displayedColumns = ["name", "weight", "amount", "value"];
    this.dataSource = new MatTableDataSource(this.inventoryService.getInventory());
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (container: ItemContainer, property: string) => {
      switch (property) {
        case "name": return container.item.name;
        case "description": return container.item.description;
        case "cost": return container.item.cost;
        case "weight": return container.item.weight;
        default: return container[property];
      }
    };
    this.dataSource.sort = this.sort;

    this.inventoryService.updated.subscribe((resp: InventoryService) => {
      this.dataSource = new MatTableDataSource(resp.getInventory());
    });

    this.player = this.playerService.player;
    this.playerService.updated.subscribe((resp: Player) => {
      this.player = resp;
    })
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClickItem(container: ItemContainer) {
    this.selectedItem = container.item;
    if (this.sell(container)) // Proceedes if it was not a buyClick
      return;
    const dialogRef = this.dialog.open(ItemComponent, {
      width: '480px',
      height: '600px',
      data: container.item
    });
  }

  // Returns true if it was a sellClick, false otherwise
  sell(container: ItemContainer): boolean {
    if (!this.sellClick) 
      return false;
    if (this.inventoryService.removeItem(container.item)){
      this.playerService.addCredits(container.item.cost);
    }
    this.sellClick = false;
    return true;
  }

  onSellClick(): void {
    this.sellClick = true;
  }

}