import { Component, ViewChild } from "@angular/core";
import { MainContainerComponent } from "../main-container/main-container.component";
import { Router } from "@angular/router";
import { MusicPlayerComponent } from "../music-player/music-player.component";
import { NgStyle } from "@angular/common";

@Component({
  selector: "app-winner-page",
  standalone: true,
  imports: [MainContainerComponent, MusicPlayerComponent, NgStyle],
  template: `
    <app-main-container>
      <div center-column>
        <img [src]="'/assets/images/leo.gif'" />
        <button class="btn-primary" (click)="newGame()">Nowa gra</button>
      </div>
      <app-music-player
        [ngStyle]="{
          visibility: 'hidden'
        }"
      ></app-music-player>
    </app-main-container>
  `,
  styles: `
  button {
    margin-top: 10px;
    width: 100%;
  }
  `,
})
export class WinnerPageComponent {
  constructor(private router: Router) {}
  @ViewChild(MusicPlayerComponent) musicPlayer!: MusicPlayerComponent;
  ngAfterViewInit() {
    this.playWin();
  }

  playWin() {
    this.musicPlayer.playWin();
  }

  newGame() {
    this.musicPlayer.stop();
    this.router.navigate([""]);
  }
}
