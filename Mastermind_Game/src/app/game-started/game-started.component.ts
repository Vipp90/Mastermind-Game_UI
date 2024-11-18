import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-game-started",
  standalone: true,
  imports: [],
  template: ` <p>{{ gameId }}</p> `,
  styles: ``,
})
export class GameStartedComponent {
  gameId: string | null = null;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get("gameId");
  }
}
