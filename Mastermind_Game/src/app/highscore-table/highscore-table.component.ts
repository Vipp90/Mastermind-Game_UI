import { NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Highscore } from "../models/Highscore";

@Component({
  selector: "app-highscore-table",
  standalone: true,
  imports: [NgFor],
  template: `
    <h1 class="text-center pb-5 font-bold text-lg">Tabela Wyników</h1>
    <table class="table-auto w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th>#</th>
          <th>Imię</th>
          <th>Wynik (czas)</th>
        </tr>
      </thead>
      <tbody>
        <tr
          *ngFor="let highscore of highscoreTable; let i = index"
          class="text-center"
        >
          <td class="border px-4 py-2">{{ i + 1 }}</td>
          <td class="border px-4 py-2">{{ highscore.playerName }}</td>
          <td class="border px-4 py-2">{{ highscore.score }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: `
  .table-auto {
    width: 100%;
    border-collapse: collapse;
  }
  .border {
    border: 1px black solid;
  }
  .bg-gray-200 {
    background-color: #f5f5f5;
th{
    border: 1px black solid ;
  }
  }`,
})
export class HighscoreTableComponent {
  @Input() highscoreTable: Highscore[] = [];
}
