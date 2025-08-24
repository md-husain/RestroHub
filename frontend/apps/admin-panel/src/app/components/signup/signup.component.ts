import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User, UsersService } from '@frontend/users';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private routerService: Router,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxLoaderService: NgxUiLoaderService,
    private usersService: UsersService
  ) {}
  onFormSubmit() {
    this.ngxLoaderService.start();
    if (this.userForm.invalid) {
      return;
    }
    const user: User = {
      name: this.userForm.controls['name'].value,
      email: this.userForm.controls['email'].value,
      contactNumber: this.userForm.controls['contactNumber'].value,
      password: this.userForm.controls['password'].value,
    };
    this.usersService
      .signUp(user)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.ngxLoaderService.stop();
          
          this.dialogRef.close();
        },
        error: (error) => {
          this.ngxLoaderService.stop();
          console.log(error);
        },
      });
  }
}
