import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemContainer, InventoryService } from '../../inventory/inventory.service';

@Component({
  selector: 'app-storeroom',
  templateUrl: './storeroom.component.html',
  styleUrls: ['./storeroom.component.css']
})
export class StoreroomComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<ItemContainer>;

  constructor(private inventoryService: InventoryService) {
    this.displayedColumns = ["amount", "item", "description", "cost", "weight"];
    this.dataSource = new MatTableDataSource(this.inventoryService.getInventory());
  }

  ngOnInit() {

  }

}
