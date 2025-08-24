import { Component, OnInit } from '@angular/core';
import { DashBoardOverview, DashboardsService } from '@frontend/deshboard';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';

@Component({
  selector: 'frontend-deshboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dashboardOverview: DashBoardOverview | null = null;
  constructor(
    private dashboardsService: DashboardsService,
    private ngxService: NgxUiLoaderService
  ) {}
  ngOnInit(): void {
    this.ngxService.start();
    this.dashboardsService
      .getDashBoardOverview()
      .pipe(take(1))
      .subscribe({
        next: (dashboardOverview) => {
          this.ngxService.stop();
          this.dashboardOverview = dashboardOverview;
        },
      });
  }
}
