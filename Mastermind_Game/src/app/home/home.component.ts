import { Component } from "@angular/core";
import { NgFor } from "@angular/common";
import { Highscore } from "./Highscore";
import { HighscoreTableComponent } from "../highscore-table/highscore-table.component";
import { HighscoreService } from "../services/highscore.service";
import { FormsModule } from "@angular/forms";
import { ColorButtonComponent } from "../color-button/color-button.component";
import { MainContainerComponent } from "../main-container/main-container.component";
import { GameService } from "../services/game.service";
import { GameInfo } from "../models/GameInfo";
import { Colors } from "../models/GameInfo";
import { GameMode } from "../models/GameInfo";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    NgFor,
    HighscoreTableComponent,
    FormsModule,
    ColorButtonComponent,
    MainContainerComponent,
  ],
  template: `
    <div class="container max-w-none">
      <app-main-container>
        <div left-column>
          <app-highscore-table
            [highscoreTable]="highscoreTable"
          ></app-highscore-table>
        </div>
        <div center-column>
          <p>Wybierz kolory dla gracza</p>
          <div class="button-container">
            <div *ngFor="let color of buttonColors; let i = index">
              <app-color-button
                [color]="color"
                (colorChange)="changeColor($event, i)"
              ></app-color-button>
            </div>
          </div>
          <div class="primary-button-container">
            <button class="btn-primary" (click)="startGame(GameMode.ManualSet)">
              Ustaw kod
            </button>
            <button class="btn-primary" (click)="startGame(GameMode.RandomSet)">
              Losowa gra
            </button>
          </div>
          <p style="font-size:15px; text-align:center; padding-bottom:15px">
            Instrukcja
          </p>
          <p style="font-size:12px; text-align:justify">
            Gra polega na odgadnięciu kolorowego kodu składającego się z 4
            elementów. Każdy element może być kolorem jednym z 6 (<a
              style="color:red"
              >czerwony </a
            >,<a style="color:blue">niebieski</a>,
            <a style="color:green">zielony </a>,<a style="color:yellow"
              >żółty </a
            >, <a style="color:brown">brązowy </a>,
            <a style="color:orange">pomarańczowy </a>). Kolory mogą się
            powtarzać. Kod można odgadnąć w 6 próbach, za każdą próbą
            otrzymujemy wskazówki. Czarne kółko
            <img src="assets/images/blackCircle.png" />oznacza, że jeden z
            kolorów jest na właściwym miejscu, białe kółko
            <img src="/assets/images/whiteCircle.png" /> oznacza, że jeden z
            kolorów jest właściwy ale jest w złym miejscu, natomiast kółko z
            krzyżykiem
            <img src="/assets/images/emptyCircle.png" />
            oznacza, że któryś z kolorów nie pasuje do kodu. Pozycje podpowiedzi
            są generowane losowo, prosze nie sugerować się kolejnością :-) W grę
            można grać we dwoje, jedna osoba ustawia kod klikając w kółka
            powyżej i wybiera przycisk "Ustaw kod", druga osoba odgaduje. Można
            również wygenerować losowy kod, po odgadnięciu którego znajdziecie
            się na tablicy dziesięciu najlepszych wyników. <br />
            <a style="text-align:center">Powodzenia! :)</a>
          </p>
        </div>
        <div right-column>
          <div class="name-input">
            <label for="playerName">Twoje imię</label>
            <input
              type="text"
              id="playerName"
              placeholder="Wpisz swoje imię"
              [(ngModel)]="playerName"
              maxlength="20"
            />
          </div>
        </div>
      </app-main-container>
    </div>
  `,
  styles: `

  .container{
    display: flex;
    flex-direction:column;
    height: 100vh;
    width:100%;
    margin: 0; 
    padding: 0; 
  }
 
.primary-button-container {
  display: flex;                
  gap: 1rem;                   
  justify-content: center;     
  margin-top: 1rem;
  margin-bottom : 1rem;
  cursor: pointer;         
}

img {
  display: inline-block;
  vertical-align: middle;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 1rem; 
  padding: 20px 0 20px 0;
}

.name-input {
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
  text-align: center;
}
  `,
})
export class HomeComponent {
  highscoreTable: Highscore[] = [];
  playerName = "";
  GameMode = GameMode;
  gameId = "";

  ngOnInit() {
    this.fetchHighscores();
  }
  constructor(
    private highscoreService: HighscoreService,
    private gameService: GameService
  ) {}
  fetchHighscores(): void {
    this.highscoreService.getHighscores().subscribe({
      next: (scores) => (this.highscoreTable = scores),
      error: (err) => console.error("Błąd pobierania wyników", err),
    });
  }

  buttonColors: Colors[] = [
    Colors.White,
    Colors.White,
    Colors.White,
    Colors.White,
  ];

  changeColor(newColor: Colors, i: number) {
    this.buttonColors[i] = newColor;
  }

  startGame(gameMode: GameMode) {
    const gameInfo: GameInfo = {
      playerName: this.playerName,
      code: {
        firstColor: this.buttonColors[0],
        secondColor: this.buttonColors[1],
        thirdColor: this.buttonColors[2],
        fourthColor: this.buttonColors[3],
      },
      gameMode: gameMode,
    };
    this.gameService.createGame(gameInfo).subscribe({
      next: (id) => (this.gameId = id),
      error: (err) => console.error("Nie udało się utworzyć gry", err),
    });
  }
}
