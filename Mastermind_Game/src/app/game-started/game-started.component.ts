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
import { CheckCodeResponse } from "../models/CheckCodeResponse";
import { NgFor } from "@angular/common";

@Component({
  selector: "app-game-started",
  standalone: true,
  imports: [MainContainerComponent, StopwatchComponent, ButtonContainerComponent, NgFor],
  template: `
    <div class="container max-w-none">
      <app-main-container>
        <div left-column></div>
        <div center-column>
          <app-stopwatch></app-stopwatch>
          <div *ngFor="let chance of [].constructor(chances + 1); let i = index">
            <app-button-container
              [buttonColors]="containerColors[i]"
              (colorChange)="handleColorChange($event, i)"
            ></app-button-container>
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
  `,
})
export class GameStartedComponent {
  gameId: string = "";
  @ViewChild(StopwatchComponent) stopwatch!: StopwatchComponent;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get("gameId") ?? "";
  }
  containerColors: Colors[][] = [
    [Colors.White, Colors.White, Colors.White, Colors.White],
    [Colors.White, Colors.White, Colors.White, Colors.White],
    [Colors.White, Colors.White, Colors.White, Colors.White],
    [Colors.White, Colors.White, Colors.White, Colors.White],
    [Colors.White, Colors.White, Colors.White, Colors.White],
    [Colors.White, Colors.White, Colors.White, Colors.White],
  ];
  chances: number = 0;
  newGame() {}

  checkCode() {
    if (this.containerColors[this.chances].includes(Colors.White)) {
      this.notificationService.showError("Zanim sprawdzisz kod musisz ustawić kolory");
      return;
    }

    let userCode: Code = {
      firstColor: this.containerColors[this.chances][0],
      secondColor: this.containerColors[this.chances][1],
      thirdColor: this.containerColors[this.chances][2],
      fourthColor: this.containerColors[this.chances][3],
    };
    this.gameService.checkCode(this.gameId, userCode).subscribe({
      next: (response: ApiResponse<CheckCodeResponse>) => {
        console.log(response.body.hint.correctPlace);
        console.log(response.body.hint.wrongPlace);
        console.log(response.body.hint.notOccur);
      },
      error: (err) => {
        this.notificationService.showError("Nie udało się sprawdzić kodu");
        console.error(err.error);
      },
    });
    if (this.chances < 5) {
      this.chances++;
    }
  }

  handleColorChange(event: { index: number; newColor: Colors }, containerIndex: number) {
    if (containerIndex === this.chances) {
      var container = this.containerColors[this.chances];
      container[event.index] = event.newColor;
    }
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
