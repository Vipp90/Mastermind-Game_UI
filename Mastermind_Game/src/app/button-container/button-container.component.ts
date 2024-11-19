import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ColorButtonComponent } from "../color-button/color-button.component";
import { Colors } from "../models/GameInfo";
import { NgFor } from "@angular/common";

@Component({
  selector: "app-button-container",
  standalone: true,
  imports: [ColorButtonComponent, NgFor],
  template: `
    <div class="button-container">
      <div *ngFor="let color of buttonColors; let i = index">
        <app-color-button
          [color]="color"
          (colorChange)="changeColor($event, i)"
        ></app-color-button>
      </div>
    </div>
  `,
  styles: `
  .button-container {
  display: flex;
  justify-content: center;
  gap: 1rem; 
  padding: 20px 0 20px 0;
}
  `,
})
export class ButtonContainerComponent {
  @Input() buttonColors: Colors[] = [];
  @Output() colorChange = new EventEmitter<{ index: number; newColor: Colors }>();

  changeColor(newColor: Colors, index: number) {
    this.colorChange.emit({ index, newColor });
  }
}
