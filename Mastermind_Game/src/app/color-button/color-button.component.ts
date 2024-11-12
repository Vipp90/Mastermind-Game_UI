import { NgStyle } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-color-button",
  standalone: true,
  imports: [NgStyle],
  template: `
    <button
      [ngStyle]="{ 'background-color': color }"
      (click)="nextColor()"
      class="circle-button"
    ></button>
  `,
  styles: [
    `
      .circle-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid black;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
    `,
  ],
})
export class ColorButtonComponent {
  @Input() color!: string;
  colors = ["blue", "red", "green", "yellow", "orange", "brown"];

  nextColor() {
    const currentIndex = this.colors.indexOf(this.color);
    this.color = this.colors[(currentIndex + 1) % this.colors.length];
  }
}
