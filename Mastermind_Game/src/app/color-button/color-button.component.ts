import { NgStyle } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Colors } from "../models/GameInfo";

@Component({
  selector: "app-color-button",
  standalone: true,
  imports: [NgStyle],
  template: `
    <button
      [ngStyle]="{ 'background-color': getColorCSS(color) }"
      (click)="nextColor()"
      class="circle-button"
    ></button>
  `,
  styles: [
    `
      .circle-button {
        width: 40px;
        height: 40px;
        background-color: white;
        border-radius: 50%;
        border: 1px solid black;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
    `,
  ],
})
export class ColorButtonComponent {
  @Input() color!: Colors;
  @Output() colorChange = new EventEmitter<Colors>();
  currentColor!: Colors;

  private colorMap: { [key in Colors]: string } = {
    [Colors.White]: "white",
    [Colors.Blue]: "blue",
    [Colors.Red]: "red",
    [Colors.Green]: "green",
    [Colors.Yellow]: "yellow",
    [Colors.Brown]: "brown",
    [Colors.Orange]: "orange",
  };

  getColorCSS(color: Colors): string {
    return this.colorMap[color];
  }

  nextColor() {
    const colorsEnumValues = Object.values(Colors).filter(
      (value) => typeof value === "number" && value != Colors.White
    ) as Colors[];
    const currentIndex = colorsEnumValues.indexOf(this.color);
    this.currentColor =
      colorsEnumValues[(currentIndex + 1) % colorsEnumValues.length];
    this.colorChange.emit(this.currentColor);
  }
}
