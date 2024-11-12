import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  template: ` <div class="header">Mastermind</div> `,
  styles: `.header {
    color: #1E40AF; 
    background-color: black;
    padding: 16px 0; 
    font-size: 2rem;
    text-align: center; 
  }`,
})
export class HeaderComponent {}
