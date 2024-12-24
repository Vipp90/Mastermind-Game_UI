import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { GameInfo } from "../models/GameInfo";
import { ApiResponse } from "../models/ApiResponse";
import { Code } from "../models/GameInfo";
import { CheckCodeResponse } from "../models/CheckCodeResponse";

@Injectable({ providedIn: "root" })
export class GameService {
  private readonly apiUrl = environment.apiUrl;
  private readonly headers = new HttpHeaders({ "Content-Type": "application/json" });
  private http = inject(HttpClient);

  private getHttpOptions() {
    return { headers: this.headers };
  }

  createGame(gameInfo: GameInfo): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      this.apiUrl + "/game",
      gameInfo,
      this.getHttpOptions()
    );
  }

  checkCode(gameId: string, code: Code): Observable<ApiResponse<CheckCodeResponse>> {
    return this.http.post<ApiResponse<CheckCodeResponse>>(
      this.apiUrl + `/game/${gameId}/guess`,
      code,
      this.getHttpOptions()
    );
  }

  saveScore(gameId: string, score: number): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      this.apiUrl + `/game/${gameId}/score`,
      score,
      this.getHttpOptions()
    );
  }

  deleteGame(gameId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/game/${gameId}`);
  }
}
