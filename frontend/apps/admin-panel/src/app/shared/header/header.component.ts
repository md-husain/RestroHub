import { Component, OnInit } from '@angular/core';
import { AuthService } from '@frontend/users';

@Component({
  selector: 'frontend-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) {}
  opened = false;
  ngOnInit(): void {
    console.log('HELLO');
  }

  handleSideNav() {
    console.log("Pressed")
    this.opened = true;
  }

  logOut(): void {
    this.authService.logOut();
  }
}
