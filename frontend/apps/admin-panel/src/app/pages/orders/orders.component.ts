import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bill, BillsService } from '@frontend/bills';
import { CategoriesService } from '@frontend/categories';
import { Product, ProductsService } from '@frontend/products';
import { Cart, Category, SuccessMsg, ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';
import { saveAs } from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '@frontend/users';

@Component({
  selector: 'frontend-orders',
  templateUrl: './orders.component.html',
  styles: [],
})
export class OrdersComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  cartItems: Cart[] = [];
  subTotal = 0;
  columns: string[] = [
    'name',
    'category',
    'quantity',
    'price',
    'total',
    'actions',
  ];
  dataSource: MatTableDataSource<Cart> | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  paymentMethods: string[] = ['Cash', 'Debit Card', 'Credit Card'];
  userId = '';
  orderForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    quantity: new FormControl(
      { value: 0, disabled: true },
      Validators.required
    ),
    price: new FormControl({ value: '', disabled: true }, Validators.required),
    total: new FormControl({ value: 0, disabled: true }, Validators.required),
    valid: new FormControl(false),
  });
  constructor(
    private billsService: BillsService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private toastService: ToastService,
    private ngxService: NgxUiLoaderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this._getCategories();
    this._getUserId();
  }

  onFormSubmit() {
    const bill: Bill = {
      name: this.orderForm.controls['name'].value,
      email: this.orderForm.controls['email'].value,
      paymentMethod: this.orderForm.controls['paymentMethod'].value,
      phoneNumber: this.orderForm.controls['contactNumber'].value,
      productDetails: JSON.stringify(this.cartItems),
      total: this.subTotal,
      createdBy: this.userId,
    };
    this.ngxService.start();
    this.billsService
      .generateReport(bill)
      .pipe(take(1))
      .subscribe({
        next: (successMsg: SuccessMsg) => {
          const billId = successMsg.billId;
          this.billsService
            .getPDF(billId || '')
            .pipe(take(1))
            .subscribe({
              next: (blob: Blob) => {
                this.orderForm.reset();
                const file = new Blob([blob], { type: 'application/pdf' });
                // const fileURL = URL.createObjectURL(file);
                const fileName = Date.now().toString();
                saveAs(file, fileName + '.pdf');
                this.ngxService.stop();
                // window.open(fileURL, '_blank', 'width=1000, height=800');
              },
              error: () => {
                this.ngxService.stop();
                this.toastService.errorToast('Server error');
              },
            });
        },
        error: (error) => {
          this.toastService.errorToast(error.error.message || 'Server error');
          this.ngxService.stop();
        },
      });
  }
  setQuantity() {
    const price = this.orderForm.controls['price'].value;
    const quantity = this.orderForm.controls['quantity'].value;
    this.orderForm.controls['total'].setValue(price * quantity);
  }

  addToCart() {
    const id = this.orderForm.controls['product'].value;
    this.ngxService.start();
    this.productsService
      .getProduct(id)
      .pipe(take(1))
      .subscribe((product) => {
        this.ngxService.stop();
        const cartItem: Cart = {
          name: product.name || '',
          category: product.category?.name || '',
          price: product.price || 0,
          quantity: parseInt(this.orderForm.controls['quantity'].value),
          total: this.orderForm.controls['total'].value,
        };
        let isPresent = false;
        this.cartItems.forEach((item) => {
          if (item.name === cartItem.name) {
            const prevQuantity = parseInt(item.quantity.toString());
            const newQuantity = parseInt(cartItem.quantity.toString());
            item.quantity = prevQuantity + newQuantity;
            item.total = item.quantity * item.price;
            isPresent = true;
            this.toastService.successToast(
              'Product quantity updated successfully'
            );
          }
        });
        if (!isPresent) {
          this.toastService.successToast('Product added successfully');
          this.cartItems.push(cartItem);
        }
        this.subTotal = 0;
        this.cartItems.forEach((item) => {
          this.subTotal += item.price * item.quantity;
        });
        this.dataSource = new MatTableDataSource(this.cartItems);
        if (this.paginator && this.sort) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this._checkFormValidity();
      });
  }

  deleteFromCart(name: string) {
    this.cartItems = this.cartItems.filter((item) => {
      return item.name !== name;
    });
    this.subTotal = 0;
    this.cartItems.forEach((item) => {
      this.subTotal += item.price * item.quantity;
    });
    this.dataSource = new MatTableDataSource(this.cartItems);
    this._checkFormValidity();
  }

  setCartItem(product: Product) {
    this.orderForm.controls['product'].setValue(product._id);
    this.orderForm.controls['quantity'].setValue(1);
    this.orderForm.controls['quantity'].enable();
    this.orderForm.controls['price'].setValue(product.price);
    this.orderForm.controls['total'].setValue(product.price);
  }

  getProductByCategory(id: string) {
    this.ngxService.start();
    this.productsService
      .getPorductsByCategory(id)
      .pipe(take(1))
      .subscribe({
        next: (products) => {
          this.ngxService.stop();
          this.products = products;
          this.orderForm.controls['product'].setValue('');
          this.orderForm.controls['quantity'].setValue(0);
          this.orderForm.controls['price'].setValue('');
          this.orderForm.controls['total'].setValue(0);
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
          this.ngxService.stop();
          this.categories = categories;
        },
      });
  }
  private _checkFormValidity() {
    if (
      this.orderForm.controls['name'].valid &&
      this.orderForm.controls['email'].valid &&
      this.orderForm.controls['contactNumber'].valid &&
      this.orderForm.controls['paymentMethod'].valid &&
      this.cartItems.length !== 0
    ) {
      this.orderForm.controls['valid'].setValue(true);
    } else {
      this.orderForm.controls['valid'].setValue(false);
    }
  }
  private _getUserId() {
    this.userId = this.authService.getId();
  }
}
