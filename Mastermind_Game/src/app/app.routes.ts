import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { GameStartedComponent } from "./game-started/game-started.component";
export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "game-started/:gameId", component: GameStartedComponent },
];
