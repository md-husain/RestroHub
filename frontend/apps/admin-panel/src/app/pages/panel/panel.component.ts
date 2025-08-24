import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@frontend/users';
import { DialogData } from '@frontend/utilities';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';

@Component({
  selector: 'frontend-panel',
  templateUrl: './panel.component.html',
  styles: [],
})
export class PanelComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  handleNavigation() {
    this.router.navigateByUrl('category');
  }

  logOut() {
    const dialogData: DialogData = { message: 'Logout' };
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: dialogData,
      width: '550px',
    });
    dialogRef.componentInstance.EmitStatusChange.subscribe(() => {
      dialogRef.close();
      this.authService.logOut();
      this.router.navigateByUrl('/');
    });
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }
}
