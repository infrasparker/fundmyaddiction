import { Injectable, EventEmitter } from '@angular/core';
import { Item } from '../../model/item/item.model';
import { Weapon } from '../../model/item/weapon.model';
import { Armor, ArmorType, ArmorSlot } from '../../model/item/armor.model';
import { ItemContainer } from '../inventory/inventory.service';

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  public general: Shop;
  public apothecary: Shop;
  public weaponsmith: Shop;
  public armorsmith: Shop;

  public rotation: Shop[];
  private rNum : number;

  private info: string[][];
  public icon: string;
  public name: string;


  constructor() {

      // General Store
      this.general = new Shop();
      this.general.addItem(new Item("Torch", "Creates Light!", 5, 5), 5);
      this.general.addItem(new Item("Bedroll", "zzz", 10, 5), 10);
      this.general.addItem(new Item("Rope", "rope things", 20, 5), 20);

      // Apothecary
      this.apothecary = new Shop();
      this.apothecary.addItem(new Item("Potion", "Heal", 5, 5), 5);
      this.apothecary.addItem(new Item("Scroll", "Learn", 5, 5), 10);
      this.apothecary.addItem(new Item("Herbs", "Blaze it", 5, 5), 20);

      // Weaponsmith
      this.weaponsmith = new Shop();
      this.weaponsmith.addItem(Weapon.standard_weapon("club"));

      // Armorsmith
      this.armorsmith = new Shop;
      this.armorsmith.addItem(Armor.standard_armor("padded"));
      this.armorsmith.addItem(new Armor("Ninja Suit", "Stealthy armor that provides little protection", 100, 2, 1, ArmorType.Light, true, ArmorSlot.Torso));

      this.rotation = [this.general, this.apothecary, this.weaponsmith, this.armorsmith];
      this.rNum = 0;
      this.info = [ ["General Store","shopping_cart"], ["Apothecary", "local_drink"], ["Weaponsmith", "colorize"], ["Armorsmith", "security"] ];
      this.name = "General Store";
      this.icon = "shopping_cart";
  }

  public getInventory(): ItemContainer[] {
      return this.rotation[Math.abs(this.rNum % this.rotation.length)].getInventory();
  }

  public getCurrentShop(): Shop {
      return this.rotation[Math.abs(this.rNum % this.rotation.length)];
  }

  public rotate(forward: boolean): void {
      if(forward)
          this.rNum++;
      else
          this.rNum--;
      this.name = this.info[Math.abs(this.rNum % this.rotation.length)][0];
      this.icon = this.info[Math.abs(this.rNum % this.rotation.length)][1];
  }
    
}

export class Shop {
  private inventory: Map<string, ItemContainer>;

  public updated: EventEmitter<Shop> = new EventEmitter<Shop>();
  
  constructor() {
      this.inventory = new Map();
  }

  public getInventory(): ItemContainer[] {
    let inventory: ItemContainer[] = [];
    Array.from(this.inventory.keys()).forEach((key: string) => {
      inventory.push(this.inventory.get(key));
    });
    return inventory;
  }

  public addItem(item: Item, amount: number = 1): void {
    if (this.inventory.has(item.key()))
      this.inventory.get(item.key()).amount += amount;
    else
      this.inventory.set(item.key(), new ItemContainer(item, amount));
    this.updated.emit(this);
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
      this.updated.emit(this)
      return true;
    }
  }        
  }