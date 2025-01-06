import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../enviroments/enviroment";
import { GameInfo } from "../models/GameInfo";
import { ApiResponse } from "../models/ApiResponse";
import { CheckCodeResponse } from "../models/CheckCodeResponse";
import { CheckCodeRequest } from "../models/CheckCodeRequest";

@Injectable({ providedIn: "root" })
export class GameService {
  private readonly apiUrl = environment.apiUrl;
  private readonly headers = new HttpHeaders({ "Content-Type": "application/json" });
  private http = inject(HttpClient);

  private getHttpOptions() {
    return { headers: this.headers };
  }

  createGame(gameInfo: GameInfo): Observable<ApiResponse<string>> {
    return this.http
      .post<ApiResponse<string>>(this.apiUrl + "/game", gameInfo, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  checkCode(
    gameId: string,
    request: CheckCodeRequest
  ): Observable<ApiResponse<CheckCodeResponse>> {
    return this.http
      .post<ApiResponse<CheckCodeResponse>>(
        this.apiUrl + `/game/${gameId}/guess`,
        request,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  saveScore(gameId: string, score: number): Observable<ApiResponse<string>> {
    return this.http
      .post<ApiResponse<string>>(
        this.apiUrl + `/game/${gameId}/score`,
        score,
        this.getHttpOptions()
      )
      .pipe(catchError(this.handleError));
  }

  deleteGame(gameId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/game/${gameId}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error("Brak połączenia z API:", error.message);
      return throwError(() => new Error("Nie można połączyć się z serwerem API."));
    } else if (error.status >= 500) {
      console.error("Błąd serwera:", error.message);
      return throwError(
        () => new Error("Wystąpił problem z serwerem. Spróbuj ponownie później.")
      );
    } else {
      console.error("Błąd HTTP:", error.message);
      return throwError(() => error);
    }
  }
}
