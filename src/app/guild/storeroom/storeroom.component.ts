import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemContainer, InventoryService } from '../../inventory/inventory.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Item } from '../../inventory/item/item.model';

@Component({
  selector: 'app-storeroom',
  templateUrl: './storeroom.component.html',
  styleUrls: ['./storeroom.component.css']
})
export class StoreroomComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<ItemContainer>;

  selectedItem: Item;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private inventoryService: InventoryService) {
    this.displayedColumns = ["name", "cost", "weight", "amount", "details"];
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
    this.dataSource.sortingDataAccessor = (item: ItemContainer, property: string) => {
      switch (property) {
        case "name": return item.item.name;
        case "description": return item.item.description;
        case "cost": return item.item.cost;
        case "weight": return item.item.weight;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
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
    console.log(container);
    this.selectedItem = container.item;
  }
}
