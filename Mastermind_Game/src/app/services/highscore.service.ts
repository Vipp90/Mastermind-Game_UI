import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Highscore } from "../models/Highscore";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { ApiResponse } from "../models/ApiResponse";

@Injectable({ providedIn: "root" })
export class HighscoreService {
  private readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getHighscores(): Observable<ApiResponse<Highscore[]>> {
    return this.http.get<ApiResponse<Highscore[]>>(this.apiUrl + "/game/score");
  }
}
