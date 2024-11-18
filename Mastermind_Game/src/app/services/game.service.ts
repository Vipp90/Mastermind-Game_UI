import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { GameInfo } from "../models/GameInfo";
import { ApiResponse } from "../models/ApiResponse";

@Injectable({ providedIn: "root" })
export class GameService {
  private readonly apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  createGame(gameInfo: GameInfo): Observable<ApiResponse<string>> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.post<ApiResponse<string>>(
      this.apiUrl + "/game",
      gameInfo,
      {
        headers,
      }
    );
  }
}
