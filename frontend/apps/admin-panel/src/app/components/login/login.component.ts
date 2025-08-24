import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User, UsersService } from '@frontend/users';
import { LocalStorageService, ToastService } from '@frontend/utilities';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private usersService: UsersService,
    private router: Router,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private localStorageService: LocalStorageService
  ) {}
  onFormSubmit() {
    this.ngxService.start();
    const user: User = {
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value,
    };
    this.usersService
      .login(user)
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.localStorageService.setToken(user.token ? user.token : '');
          this.ngxService.stop();
          this.dialogRef.close();
          this.toastService.successToast('Successfully Logged in');
          this.router.navigateByUrl('/panel');
        },
        error: (error: ErrorEvent) => {
          this.ngxService.stop();
          if (error.error.message) {
            this.toastService.errorToast(error.error.message);
          } else {
            this.toastService.errorToast('Please try again later');
          }
        },
      });
  }
}
