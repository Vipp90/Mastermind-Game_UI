import { Component, Input } from "@angular/core";
import { Colors } from "../models/GameInfo";
import { NgStyle } from "@angular/common";

@Component({
  selector: "app-hidden-code",
  standalone: true,
  imports: [NgStyle],
  template: `
    <div>
      <button
        [ngStyle]="{ 'background-color': getColorCSS(colors[0]) }"
        class="hiddenCodeButton"
      >
        {{ value }}
      </button>
      <button
        [ngStyle]="{ 'background-color': getColorCSS(colors[1]) }"
        class="hiddenCodeButton"
      >
        {{ value }}
      </button>
      <button
        [ngStyle]="{ 'background-color': getColorCSS(colors[2]) }"
        class="hiddenCodeButton"
      >
        {{ value }}
      </button>
      <button
        [ngStyle]="{ 'background-color': getColorCSS(colors[3]) }"
        class="hiddenCodeButton"
      >
        {{ value }}
      </button>
    </div>
  `,
  styles: `
  .hiddenCodeButton{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    cursor: default;
    font-size: 10px;
    border : 1px solid black;
    vertical-align: middle;
  }
  `,
})
export class HiddenCodeComponent {
  private _colors: Colors[] = [];
  value: string = "?";

  @Input() set colors(value: Colors[]) {
    this._colors = value;
    if (this._colors.length > 0) {
      this.value = "";
    }
  }

  get colors(): Colors[] {
    return this._colors;
  }

  getColorCSS(color: Colors): string {
    return this.colorMap[color];
  }
  private colorMap: { [key in Colors]: string } = {
    [Colors.White]: "white",
    [Colors.Blue]: "blue",
    [Colors.Red]: "red",
    [Colors.Green]: "green",
    [Colors.Yellow]: "yellow",
    [Colors.Brown]: "brown",
    [Colors.Orange]: "orange",
  };
}
