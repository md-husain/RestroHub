import { Component, OnInit } from '@angular/core';
import { TopupsService } from '@frontend/topups';
import { take } from 'rxjs/operators';

interface PendingRequest {
  _id: string;
  // Add other fields as needed
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  pendingRequests: PendingRequest[] = [];

  constructor(private topupsService: TopupsService) {}

  ngOnInit(): void {
    this.fetchPendingRequests();
  }

  fetchPendingRequests() {
    this.topupsService.getPendingRequests()
      .pipe(take(1))
      .subscribe({
        next: (requests: PendingRequest[]) => {
          this.pendingRequests = requests;
        },
        error: (err) => {
          console.error('Error fetching requests', err);
        }
      });
  }

  approve(id: string) {
    this.topupsService.approveRequest(id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log('Request approved!', response);
          this.pendingRequests = this.pendingRequests.filter(req => req._id !== id);
        },
        error: (err) => {
          console.error('Approval failed', err);
        }
      });
  }
}