import { Component } from "@angular/core";
import { Input } from "@angular/core";
@Component({
  selector: "app-chance-show",
  standalone: true,
  imports: [],
  template: `
    <img [src]="'/assets/images/hanged' + index + '.png'" alt="Chance Image" />
  `,
  styles: `
  img {
  min-width : 50px;
  width : 50px;
  height : 50px;
}
.container {
  
  display: flex;
  justify-content: center;
  gap: 1rem; 
  padding: 20px 0 20px 0;
  border : 1px solid black;
}
  `,
})
export class ChanceShowComponent {
  @Input() index = 0;
}
