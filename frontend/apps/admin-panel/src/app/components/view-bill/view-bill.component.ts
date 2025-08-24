import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Bill, Cart } from '@frontend/bills';

@Component({
  selector: 'frontend-view-bill',
  templateUrl: './view-bill.component.html',
  styles: [],
})
export class ViewBillComponent implements OnInit {
  columns: string[] = ['name', 'category', 'quantity', 'price', 'total'];
  dataSource: MatTableDataSource<Cart> | null = null;
  constructor(@Inject(MAT_DIALOG_DATA) public bill: Bill) {}
  ngOnInit(): void {
    if (this.bill.cartItems) {
      this.dataSource = new MatTableDataSource(this.bill.cartItems);
    }
  }
}
