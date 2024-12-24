import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: "root" })
export class NotificationService {
  private isToastActive = false;
  private toastQueue: {
    message: string;
    title?: string;
    type: "success" | "error" | "info" | "warning";
  }[] = [];
  constructor(private toastr: ToastrService) {}

  showToast(
    type: "success" | "error" | "info" | "warning",
    message: string,
    title?: string
  ) {
    this.toastQueue.push({ type, message, title });
    this.processQueue();
  }

  private processQueue() {
    if (this.isToastActive || this.toastQueue.length === 0) {
      return;
    }

    this.isToastActive = true;
    const toast = this.toastQueue.shift();

    if (toast) {
      this.toastr[toast.type](toast.message, toast.title, {
        timeOut: 4000,
        progressBar: true,
        closeButton: true,
      }).onHidden.subscribe(() => {
        this.isToastActive = false;
        this.processQueue();
      });
    }
  }
}
