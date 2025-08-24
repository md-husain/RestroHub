import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, UsersService } from '@frontend/users';
import { DialogData, ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';

@Component({
  selector: 'frontend-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit {
  columns: string[] = ['name', 'email', 'contactNumber', 'actions'];
  users: User[] = [];
  dataSource: MatTableDataSource<User> | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private usersService: UsersService,
    private ngxService: NgxUiLoaderService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getAllUsers();
  }

  private _getAllUsers() {
    this.ngxService.start();
    this.usersService
      .getUsers()
      .pipe(take(1))
      .subscribe({
        next: (users) => {
          this.ngxService.stop();
          this.dataSource = new MatTableDataSource(users);
          if (this.paginator && this.sort) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          this.users = users;
        },
        error: (error: ErrorEvent) => {
          this.toastService.errorToast(error.error.message || 'Server error');
        },
      });
  }

  changeUserStatus(id: string, isChecked: boolean) {
    const user: User = {
      status: isChecked,
      role: isChecked ? 'admin' : 'user',
    };
    this.ngxService.start();
    this.usersService
      .updateUser(id, user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.ngxService.stop();
          this.toastService.successToast('User status updated successfully');
          this._getAllUsers();
        },
        error: () => {
          this.ngxService.stop();
          this.toastService.errorToast('User status could not be updated');
        },
      });
  }

  deleteUser(id: string) {
    const dialogData: DialogData = { message: 'Logout' };
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: dialogData,
      width: '550px',
    });
    dialogRef.componentInstance.EmitStatusChange.pipe(take(1)).subscribe(() => {
      dialogRef.close();
      this.ngxService.start();
      this.usersService
        .deleteUser(id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.ngxService.stop();
            this.toastService.successToast('User deleted successfully');
            this._getAllUsers();
          },
          error: () => {
            this.ngxService.stop();
            this.toastService.errorToast('User could not be deleted');
          },
        });
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
