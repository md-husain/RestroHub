import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from '@frontend/categories';
import { Product, ProductsService } from '@frontend/products';
import { Category, DialogData, ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-products-form',
  templateUrl: './products-form.component.html',
  styles: [],
})
export class ProductsFormComponent implements OnInit {
  isEditingMode = false;
  id = '';
  categories: Category[] = [];
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl(false),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private ngxService: NgxUiLoaderService,
    private toastService: ToastService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private dialogRef: MatDialogRef<ProductsFormComponent>
  ) {}
  ngOnInit(): void {
    this._checkEditingMode();
    this._getCategories();
    console.log('YES');
  }

  onFormSubmit() {
    const product: Product = {
      name: this.productForm.controls['name'].value,
      categoryId: this.productForm.controls['category'].value,
      description: this.productForm.controls['description'].value,
      price: this.productForm.controls['price'].value,
      status: this.productForm.controls['status'].value,
    };
    if (this.isEditingMode) {
      this._updateProduct(product);
    } else {
      this._addProduct(product);
    }
  }

  private _updateProduct(product: Product) {
    this.ngxService.start();
    this.productsService
      .updateProduct(this.id, product)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.ngxService.stop();
          this.dialogRef.close();
          this.toastService.successToast('Product updated successfully');
        },
        error: (error: ErrorEvent) => {
          this.ngxService.stop();
          if (error.error.message) {
            this.toastService.errorToast(error.error.message);
          } else {
            this.toastService.errorToast('Product could not be updated');
          }
        },
      });
  }

  private _addProduct(product: Product) {
    this.ngxService.start();
    this.productsService
      .addProduct(product)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.ngxService.stop();
          this.toastService.successToast('Product added successfully');
          this.dialogRef.close();
        },
        error: (error: ErrorEvent) => {
          if (error.error.message) {
            this.toastService.errorToast(error.error.message);
          } else {
            this.toastService.errorToast('Product could not be added');
          }
        },
      });
  }

  private _checkEditingMode() {
    if (this.data.id) {
      console.log(this.data.id);
      this.isEditingMode = true;
      this.id = this.data.id;
      this._getProduct();
    }
  }
  private _getProduct() {
    this.ngxService.start();
    this.productsService
      .getProduct(this.id)
      .pipe(take(1))
      .subscribe({
        next: (product) => {
          this.ngxService.stop();
          this._getCategories();
          this.productForm.controls['name'].setValue(product.name);
          this.productForm.controls['category'].setValue(product.category?._id);
          this.productForm.controls['price'].setValue(product.price);
          this.productForm.controls['description'].setValue(
            product.description
          );
          this.productForm.controls['status'].setValue(product.status);
        },
        error: (error: ErrorEvent) => {
          this.ngxService.stop();
          if (error.error.message) {
            this.toastService.errorToast(error.error.message);
          } else {
            this.toastService.errorToast('Error in the server');
          }
        },
      });
  }
  private _getCategories() {
    this.ngxService.start();
    this.categoriesService
      .getCategories()
      .pipe(take(1))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          console.log(this.categories);
          this.ngxService.stop();
        },
      });
  }
}
