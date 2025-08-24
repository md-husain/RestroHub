import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthGuardService } from '@frontend/users';
import { LoginComponent } from '../../components/login/login.component';
import { SignupComponent } from '../../components/signup/signup.component';

@Component({
  selector: 'frontend-home-page',
  templateUrl: './home-page.component.html',
  styles: [],
})
export class HomePageComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router, private authGuardService: AuthGuardService) {}
  ngOnInit(): void {
    if (this.authGuardService.canActivate()) {
      this.router.navigateByUrl('/panel')
    }
  }
  handleSignUpAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(SignupComponent, dialogConfig);
  }
  handleLoginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
