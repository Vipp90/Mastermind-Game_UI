import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Highscore } from "../home/Highscore";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";

@Injectable({ providedIn: "root" })
export class HighscoreService {
  private readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getHighscores(): Observable<Highscore[]> {
    return this.http.get<Highscore[]>(this.apiUrl + "/game/score");
  }
}
