import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: HotToastService) {}
  successToast(message: string) {
    this.toast.success(message);
  }
  errorToast(message: string) {
    this.toast.error(message);
  }
}
