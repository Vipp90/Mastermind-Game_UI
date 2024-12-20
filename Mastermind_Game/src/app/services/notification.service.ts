import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: "root" })
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showError(message: string) {
    this.toastr.error(message, "", {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
    });
  }
}
