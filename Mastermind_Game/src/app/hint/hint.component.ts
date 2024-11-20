import { Component, Input, OnChanges } from "@angular/core";
import { Hint } from "../models/CheckCodeResponse";
import { NgFor } from "@angular/common";
import {
  HintButtonComponent,
  HintButtonType,
} from "../hint-button/hint-button.component";

@Component({
  selector: "app-hint",
  standalone: true,
  imports: [NgFor, HintButtonComponent],
  template: ` <div class="button-container">
    <div *ngFor="let button of hintButtons; let i = index">
      <app-hint-buttons [type]="button"></app-hint-buttons>
    </div>
  </div>`,
  styles: `
  .button-container{
  display : flex;
  flex-wrap: wrap;
  width: 40px;
  justify-content: center;
  gap: 2px;
  }
  `,
})
export class HintComponent {
  @Input() hint: Hint | null = null;

  get hintButtons(): HintButtonType[] {
    if (!this.hint) return [];
    return [
      ...this.createHintButtons(HintButtonType.CorrectPlace, this.hint.correctPlace),
      ...this.createHintButtons(HintButtonType.WrongPlace, this.hint.wrongPlace),
      ...this.createHintButtons(HintButtonType.NotOccur, this.hint.notOccur),
    ];
  }

  private createHintButtons(type: HintButtonType, count: number): HintButtonType[] {
    return Array(count).fill(type);
  }
}
