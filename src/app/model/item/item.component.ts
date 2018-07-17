import { Component, OnInit, Input, Inject } from '@angular/core';
import { Item } from './item.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;

  constructor(private dialogRef: MatDialogRef<ItemComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
    this.item = data;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
