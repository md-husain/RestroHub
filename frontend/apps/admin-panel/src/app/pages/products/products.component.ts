import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductsService } from '@frontend/products';
import { DialogData, ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { ProductsFormComponent } from '../../components/products-form/products-form.component';

@Component({
  selector: 'frontend-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  columns: string[] = ['name', 'category', 'description', 'price', '_id'];
  dataSource: MatTableDataSource<Product> | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private productsService: ProductsService,
    private toastService: ToastService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }

  addProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = { id: null };
    const dialogRef = this.dialog.open(ProductsFormComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this._getProducts());
  }

  updateProduct(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = { id };
    const dialogRef = this.dialog.open(ProductsFormComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => this._getProducts());
  }

  updateStatus(id: string, checked: boolean) {
    this.ngxService.start();
    this.productsService
      .updateProductStatus(id, checked)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.ngxService.stop();
          this.toastService.successToast('Product status updated successfully');
        },
        error: (error: ErrorEvent) => {
          this.ngxService.stop();
          if (error.error.message) {
            this.toastService.errorToast(error.error.message);
            this._getProducts();
          } else {
            this.toastService.errorToast('Product status could not be updated');
          }
        },
      });
  }

  deleteProduct(id: string) {
    const dialogData: DialogData = { message: 'Logout' };
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: dialogData,
    });
    dialogRef.componentInstance.EmitStatusChange.subscribe(() => {
      dialogRef.close();
      this.ngxService.start();
      this.productsService
        .deleteProduct(id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.ngxService.stop();
            this.toastService.successToast('Product deleted successfully');
            this._getProducts();
          },
          error: (error: ErrorEvent) => {
            this.ngxService.stop();
            if (error.error.message) {
              this.toastService.errorToast(error.error.message);
            } else {
              this.toastService.errorToast('Product could not be deleted');
            }
          },
        });
    });
  }

  private _getProducts() {
    this.ngxService.start();
    this.productsService
      .getProducts()
      .pipe(take(1))
      .subscribe({
        next: (products) => {
          this.ngxService.stop();
          this.products = products;
          this.dataSource = new MatTableDataSource(products);
          if (this.paginator && this.sort) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.ngxService.stop();
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
}
