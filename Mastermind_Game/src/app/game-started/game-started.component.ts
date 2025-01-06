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
import { NgFor, NgStyle, NgIf } from "@angular/common";
import { HintComponent } from "../hint/hint.component";
import { ChanceShowComponent } from "../chance-show/chance-show.component";
import { Router } from "@angular/router";
import { HiddenCodeComponent } from "../hidden-code/hidden-code.component";
import { MusicPlayerComponent } from "../music-player/music-player.component";
import { FormsModule } from "@angular/forms";
import { CheckCodeRequest } from "../models/CheckCodeRequest";

@Component({
  selector: "app-game-started",
  standalone: true,
  imports: [
    MainContainerComponent,
    StopwatchComponent,
    ButtonContainerComponent,
    NgFor,
    FormsModule,
    NgStyle,
    HintComponent,
    ChanceShowComponent,
    HiddenCodeComponent,
    MusicPlayerComponent,
  ],
  template: `
    <div class="container max-w-none">
      <app-main-container>
        <div left-column>
          <p>Ukryty kod</p>
          <app-hidden-code [colors]="hiddenCode"></app-hidden-code>
          <br />
          <label> Muzyka <input type="checkbox" [(ngModel)]="playerVisible" /></label>
          <br />
          <app-music-player
            [ngStyle]="{
              visibility: playerVisible ? 'visible' : 'hidden'
            }"
          ></app-music-player>
        </div>
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
            <app-chance-show
              [index]="i"
              [ngStyle]="{
                visibility:
                  i !== chances || (!this.success && this.isEndGame)
                    ? 'visible'
                    : 'hidden'
              }"
            ></app-chance-show>
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
  @ViewChild(MusicPlayerComponent) musicPlayer!: MusicPlayerComponent;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.gameId = this.route.snapshot.paramMap.get("gameId") ?? "";
  }
  playerVisible: boolean = true;
  containerColors: Colors[][] = this.createEmptyContainers(6);
  chances = 0;
  success = false;
  isEndGame = false;
  hints: Hint[] = [];
  hint?: Hint;
  hiddenCode: Colors[] = [];

  private createEmptyContainers(count: number): Colors[][] {
    return Array.from({ length: count }, () => Array(4).fill(Colors.White));
  }

  getChancesArray(): number[] {
    return Array.from({ length: this.chances + 1 });
  }

  newGame() {
    this.router.navigate([""]);
  }

  endGame(success: boolean, saveGame: boolean) {
    this.isEndGame = true;
    this.pauseStopwatch();
    this.stopAudioPlayer();
    if (success) {
      this.notificationService.showToast("success", "Brawo ! Odgadłeś kod!");
      if (saveGame) {
        this.gameService.saveScore(this.gameId!, this.stopwatch.time).subscribe({
          error: (err) => {
            this.notificationService.showToast("error", "Nie udało się zapisać wyniku");
            console.error(err.error);
          },
        });
      }
      this.router.navigate(["/winner-page"]);
    } else {
      this.notificationService.showToast("error", "Przegrałeś !");
      this.playDefeat();
    }
    this.gameService.deleteGame(this.gameId!).subscribe();
  }

  checkCode() {
    if (this.isEndGame) return;
    if (this.containerColors[this.chances].includes(Colors.White)) {
      this.notificationService.showToast(
        "error",
        "Zanim sprawdzisz kod musisz ustawić kolory"
      );
      return;
    }

    const isDuplicate = this.containerColors
      .slice(0, this.chances)
      .some((prevCode) =>
        this.areArraysEqual(prevCode, this.containerColors[this.chances])
      );
    if (isDuplicate) {
      this.notificationService.showToast("error", "Typowałeś już ten kod");
      return;
    }
    if (this.chances == 0) {
      this.startStopwatch();
      this.startAudioPlayer();
    }

    const [firstColor, secondColor, thirdColor, fourthColor] =
      this.containerColors[this.chances];
    const userCode: Code = { firstColor, secondColor, thirdColor, fourthColor };
    const request: CheckCodeRequest = {
      userCode: userCode,
      chances: this.chances,
    };
    this.gameService.checkCode(this.gameId!, request).subscribe({
      next: (response: ApiResponse<CheckCodeResponse>) => {
        this.handleCheckCodeResponse(response.body);
      },
      error: (err: any) => {
        this.pauseStopwatch();
        if (err instanceof Error) {
          this.notificationService.showToast(
            "error",
            "Nie udało się sprawdzić kodu. " + err.message
          );
        } else {
          this.notificationService.showToast(
            "error",
            "Gra została zakończona lub usunięta."
          );
        }
      },
    });
  }

  isApiResponse<T>(obj: any): obj is ApiResponse<T> {
    return obj.success === "boolean";
  }

  areArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  }

  handleCheckCodeResponse(response: CheckCodeResponse) {
    if (response.hiddenCode) {
      var code = response.hiddenCode;
      this.hiddenCode = [
        code.firstColor,
        code.secondColor,
        code.thirdColor,
        code.fourthColor,
      ];
    }
    this.hints.push(response.hint);
    if (response.guessed) {
      this.success = true;
      this.endGame(this.success, response.saveGame);
    } else {
      this.handleWrongGuess();
    }
  }

  private handleWrongGuess() {
    if (this.chances < 5) {
      this.chances++;
    } else {
      this.endGame(false, false);
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

  startAudioPlayer() {
    if (this.playerVisible) {
      this.musicPlayer.playNextTrack();
    }
  }

  stopAudioPlayer() {
    if (this.playerVisible) {
      this.musicPlayer.stop();
    }
  }

  playDefeat() {
    this.musicPlayer.playLoser();
  }
}
