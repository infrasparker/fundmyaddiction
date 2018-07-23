import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemContainer, InventoryService } from '../../../services/inventory/inventory.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Item } from '../../../model/item/item.model';
import { MatDialog } from '@angular/material/dialog';
import { ItemComponent } from '../../../model/item/item.component';
import { ShopService, Shop } from '../../../services/shop/shop.service';
import { PlayerService } from '../../../services/player/player.service';
import { Player } from '../../../model/player/player.model';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  //Player
  private player: Player

  // Slider control
  @Output() sliderClick = new EventEmitter();
  private navButton: string;
  
  // Rotate Control
  private shopName: string;
  private shopIcon: string;
  
  // Control Pop Up - Semaphore
  private buyClick: boolean = false;

  // Table Control
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Table Info
  displayedColumns: string[];
  dataSource: MatTableDataSource<ItemContainer>;

  selectedItem: Item;
  
  constructor(private dialog: MatDialog, private inventoryService: InventoryService, private shopService: ShopService, private playerService: PlayerService) { 

    this.navButton = "navigate_next";
    this.displayedColumns = ["name", "weight", "amount", "cost"];
    this.dataSource = new MatTableDataSource(this.shopService.getInventory());
    this.shopName = this.shopService.name;
    this.shopIcon = this.shopService.icon;
    
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

    this.shopService.getCurrentShop().updated.subscribe((resp: Shop) => {
      this.dataSource = new MatTableDataSource(resp.getInventory());
    });

    this.player = this.playerService.player;
    this.playerService.updated.subscribe((resp: Player) => {
      this.player = resp;
    });
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

  /**
   * Rotates the shop category forward or backwards
   * @param forward if true then increase 
   */
  onRotateClick(forward: boolean): void {
    this.shopService.rotate(forward);
    this.dataSource = new MatTableDataSource(this.shopService.getInventory());
    this.shopName = this.shopService.name;
    this.shopIcon = this.shopService.icon;
    this.shopService.getCurrentShop().updated.subscribe((resp: Shop) => {
      this.dataSource = new MatTableDataSource(resp.getInventory());
    });
  }

  // Toggles Navigate Button when BuyComponent is shown/hidden
  onSliderClick() {
    this.sliderClick.emit();
    if(this.navButton == "navigate_before"){
      this.navButton = "navigate_next";
    }
    else{
      this.navButton = "navigate_before";
    }
  }

  onClickItem(container: ItemContainer) {
    this.selectedItem = container.item;
    if (this.buy(container)) // Proceedes if it was not a buyClick
      return;
    const dialogRef = this.dialog.open(ItemComponent, {
      width: '480px',
      height: '600px',
      data: container.item
    });
  }

  // Returns true if it was a buyClick, false otherwise
  buy(container: ItemContainer): boolean {
    if (!this.buyClick) 
      return false;
    if (this.player.changeCredits(-container.item.cost) && this.shopService.getCurrentShop().removeItem(container.item)){
      this.playerService.updated.emit(this.player);
      this.inventoryService.addItem(container.item);  
    }
    this.buyClick = false;
    return true;
  }

  onBuyClick() {
    this.buyClick = true;
  }

}
