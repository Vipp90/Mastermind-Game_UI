import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Welcome to {{title}}!</h1>`,

})
export class AppComponent {
  title = 'Mastermind_Game';
}
