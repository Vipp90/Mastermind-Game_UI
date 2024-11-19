import { Component } from "@angular/core";

@Component({
  selector: "app-stopwatch",
  standalone: true,
  imports: [],
  template: ` <div class="stopwatch">
    <h1>Czas: {{ formatTime() }}</h1>
  </div>`,
  styles: `
  .stopwatch{
    text-align: center;
    font-family: Arial, sans-serif;
  }

  h1{
    font-size: 2rem;
    margin: 20px 0;
  }
  `,
})
export class StopwatchComponent {
  time: number = 0;
  interval: any;
  isRunning: boolean = false;

  public start() {
    if (!this.isRunning) {
      this.interval = setInterval(() => {
        this.time += 10;
      }, 10);
      this.isRunning = true;
    }
  }

  public pause() {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.interval);
    }
  }

  public reset() {
    this.pause();
    this.time = 0;
  }

  formatTime(): string {
    const minutes = Math.floor((this.time % 3600000) / 60000);
    const seconds = Math.floor((this.time % 60000) / 1000);
    const milliseconds = this.time % 1000;

    return `${this.pad(minutes)}:${this.pad(seconds)}.${this.padMilliseconds(
      milliseconds
    )}`;
  }

  private pad(value: number): string {
    return value.toString().padStart(2, "0");
  }

  private padMilliseconds(value: number): string {
    return value.toString().padStart(3, "0");
  }
}
