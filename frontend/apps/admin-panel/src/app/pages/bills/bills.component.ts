import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bill, BillsService } from '@frontend/bills';
import { DialogData, ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { ViewBillComponent } from '../../components/view-bill/view-bill.component';
import { saveAs } from 'file-saver';
@Component({
  selector: 'frontend-bills',
  templateUrl: './bills.component.html',
  styles: [],
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  columns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'paymentMethod',
    'total',
    'actions',
  ];
  dataSource: MatTableDataSource<Bill> | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private billsService: BillsService,
    private toastService: ToastService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getBills();
  }

  deleteBill(id: string) {
    const dialogData: DialogData = { message: 'delete this bill' };
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: dialogData,
    });
    dialogRef.componentInstance.EmitStatusChange.pipe(take(1)).subscribe(() => {
      dialogRef.close();
      this.billsService
        .deleteBill(id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.toastService.successToast('Bill deleted successfully');
            this._getBills();
          },
          error: () => {
            this.toastService.errorToast('Bill could not be deleted');
          },
        });
    });
  }

  viewBill(bill: Bill) {
    this.dialog.open(ViewBillComponent, {
      data: bill,
      width: '550px',
    });
  }

  getPDF(id: string) {
    this.ngxService.start();
    this.billsService
      .getPDF(id)
      .pipe(take(1))
      .subscribe({
        next: (blob: Blob) => {
          this.ngxService.stop();
          const file = new Blob([blob], { type: 'application/pdf' });
          // const fileURL = URL.createObjectURL(file);
          const fileName = Date.now().toString();
          saveAs(file, fileName + '.pdf');
          // window.open(fileURL, '_blank', 'width=1000, height=800');
        },
        error: () => {
          this.ngxService.stop();
          this.toastService.errorToast('Server error');
        },
      });
  }

  private _getBills() {
    this.ngxService.start();
    this.billsService
      .getBills()
      .pipe(take(1))
      .subscribe({
        next: (bills) => {
          this.ngxService.stop();
          this.bills = bills;
          this.dataSource = new MatTableDataSource(this.bills);
          if (this.paginator && this.sort) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
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
