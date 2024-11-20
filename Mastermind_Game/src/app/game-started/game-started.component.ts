import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MainContainerComponent } from "../main-container/main-container.component";
import { StopwatchComponent } from "../stopwatch/stopwatch.component";
import { ButtonContainerComponent } from "../button-container/button-container.component";
import { Colors } from "../models/GameInfo";
import { GameService } from "../services/game.service";
import { NotificationService } from "../services/notification.service";
import { Code } from "../models/GameInfo";
import { ApiResponse } from "../models/ApiResponse";
import { CheckCodeResponse, Hint } from "../models/CheckCodeResponse";
import { NgFor, NgStyle } from "@angular/common";
import { HintComponent } from "../hint/hint.component";

@Component({
  selector: "app-game-started",
  standalone: true,
  imports: [
    MainContainerComponent,
    StopwatchComponent,
    ButtonContainerComponent,
    NgFor,
    NgStyle,
    HintComponent,
  ],
  template: `
    <div class="container max-w-none">
      <app-main-container>
        <div left-column></div>
        <div center-column>
          <app-stopwatch></app-stopwatch>
          <div class="row" *ngFor="let chance of getChancesArray(); let i = index">
            <app-hint
              [hint]="hints[i]!"
              [ngStyle]="{
                visibility: i !== chances || isEndGame ? 'visible' : 'hidden'
              }"
            ></app-hint>
            <app-button-container
              [buttonColors]="containerColors[i]"
              (colorChange)="handleColorChange($event, i)"
            ></app-button-container>
            <app-hint></app-hint>
          </div>
          <div class="primary-button-container">
            <button class="btn-primary" (click)="newGame()">Nowa gra</button>
            <button class="btn-primary" (click)="checkCode()">Sprawdz kod</button>
          </div>
        </div>
        <div right-column></div>
      </app-main-container>
    </div>
  `,
  styles: `
  .primary-button-container {
  display: flex;                
  gap: 1rem;                   
  justify-content: center;     
  margin-top: 1rem;
  margin-bottom : 1rem;
  cursor: pointer;         
}
.row{
  display: flex;
  gap: 5rem;                   
  justify-content: center;  
  align-items: center; 
  margin-top: 1rem;
  margin-bottom : 1rem;
}
  `,
})
export class GameStartedComponent {
  gameId?: string;
  @ViewChild(StopwatchComponent) stopwatch!: StopwatchComponent;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private notificationService: NotificationService
  ) {
    this.gameId = this.route.snapshot.paramMap.get("gameId") ?? "";
  }

  containerColors: Colors[][] = this.createEmptyContainers(6);
  chances = 0;
  isEndGame = false;
  hints: Hint[] = [];
  hint?: Hint;

  private createEmptyContainers(count: number): Colors[][] {
    return Array.from({ length: count }, () => Array(4).fill(Colors.White));
  }

  getChancesArray(): number[] {
    return Array.from({ length: this.chances + 1 });
  }

  newGame() {}

  endGame(success: boolean) {
    this.isEndGame = true;
    this.pauseStopwatch();
  }

  checkCode() {
    if (this.isEndGame) return;
    if (this.containerColors[this.chances].includes(Colors.White)) {
      this.notificationService.showError("Zanim sprawdzisz kod musisz ustawić kolory");
      return;
    }

    const isDuplicate = this.containerColors
      .slice(0, this.chances)
      .some((prevCode) =>
        this.areArraysEqual(prevCode, this.containerColors[this.chances])
      );
    if (isDuplicate) {
      this.notificationService.showError("Typowałeś już ten kod");
      return;
    }
    this.startStopwatch();
    const [firstColor, secondColor, thirdColor, fourthColor] =
      this.containerColors[this.chances];
    const userCode: Code = { firstColor, secondColor, thirdColor, fourthColor };

    this.gameService.checkCode(this.gameId!, userCode).subscribe({
      next: (response: ApiResponse<CheckCodeResponse>) => {
        this.handleCheckCodeResponse(response.body);
      },
      error: (err) => {
        this.notificationService.showError("Nie udało się sprawdzić kodu");
        console.error(err.error);
      },
    });
  }

  areArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  }

  handleCheckCodeResponse(response: CheckCodeResponse) {
    this.hints.push(response.hint);
    console.log(this.hints);
    if (response.guessed) {
      this.endGame(true);
    } else {
      this.handleWrongGuess();
    }
  }

  private handleWrongGuess() {
    if (this.chances < 5) {
      this.chances++;
    } else {
      this.endGame(false);
    }
  }

  handleColorChange(event: { index: number; newColor: Colors }, containerIndex: number) {
    if (containerIndex !== this.chances || event.index < 0 || event.index > 3) return;
    var container = this.containerColors[this.chances];
    container[event.index] = event.newColor;
  }

  startStopwatch() {
    this.stopwatch.start();
  }

  pauseStopwatch() {
    this.stopwatch.pause();
  }

  resetStopwatch() {
    this.stopwatch.reset();
  }
}
