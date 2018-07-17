import { Injectable } from '@angular/core';
import { Item } from 'src/app/model/item/item.model';
import { Weapon } from 'src/app/model/item/weapon.model';
import { Armor } from 'src/app/model/item/armor.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventory: Map<string, ItemContainer>;

  constructor() {
    this.inventory = new Map();
    this.addItem(new Item("Test 1", "Test desc", 5, 5), 5);
    this.addItem(new Item("Test 2", "Test desc", 5, 5), 10);
    this.addItem(new Item("Test 1", "Test desc", 5, 5), 20);
    this.addItem(Armor.standard_armor("padded"));
    this.addItem(Weapon.standard_weapon("club"));
  }

  public getInventory(): ItemContainer[] {
    let items: ItemContainer[] = [];
    Array.from(this.inventory.keys()).forEach((key: string) => {
      items.push(this.inventory.get(key));
    });
    return items;
  }

  public addItem(item: Item, amount: number = 1): void {
    if (this.inventory.has(item.key()))
      this.inventory.get(item.key()).amount += amount;
    else
      this.inventory.set(item.key(), new ItemContainer(item, amount));
  }

  public removeItem(item: Item, amount: number = 1): boolean {
    if (!this.inventory.has(item.key()))
      return false;
    else {
      let newAmount: number = this.inventory.get(item.key()).amount - amount;
      if (newAmount > 0)
        this.inventory.get(item.key()).amount = newAmount;
      else
        this.inventory.delete(item.key());
      return true;
    }
  }
}

export class ItemContainer {
  public item: Item;
  public amount: number;

  constructor(item: Item, amount: number) {
    this.item = item;
    this.amount = amount;
  }

  public key(): string {
    return this.item.key();
  }
}