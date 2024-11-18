import { Component } from "@angular/core";

@Component({
  selector: "app-main-container",
  standalone: true,
  template: `
    <div class="main-container">
      <div class="column">
        <ng-content select="[left-column]"></ng-content>
      </div>
      <div class="column center-column">
        <ng-content select="[center-column]"></ng-content>
      </div>
      <div class="column">
        <ng-content select="[right-column]"></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .main-container {
        display: flex;
        flex-grow: 1;
        align-items: stretch;
      }

      .column {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 1rem;
      }

      .center-column {
        align-items: center;
        text-align: center;
      }
    `,
  ],
})
export class MainContainerComponent {}
