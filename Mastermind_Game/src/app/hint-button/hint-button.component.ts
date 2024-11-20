import { Component, Input } from "@angular/core";
import { NgStyle } from "@angular/common";

export enum HintButtonType {
  CorrectPlace,
  WrongPlace,
  NotOccur,
}

@Component({
  selector: "app-hint-buttons",
  standalone: true,
  imports: [NgStyle],
  template: `
    <button
      [ngStyle]="{
        backgroundColor: styles.backgroundColor,
      }"
      class="hintButton"
    >
      {{ styles.value }}
    </button>
  `,
  styles: `
  .hintButton{
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
export class HintButtonComponent {
  @Input() type!: HintButtonType;

  get styles() {
    switch (this.type) {
      case HintButtonType.CorrectPlace:
        return {
          backgroundColor: "black",
          value: "",
        };

      case HintButtonType.WrongPlace:
        return {
          backgroundColor: "white",
          value: "",
        };

      case HintButtonType.NotOccur:
        return {
          backgroundColor: "white",
          value: "X",
        };
      default:
        return { backgroundColor: "transparent", value: "err" };
    }
  }
}
