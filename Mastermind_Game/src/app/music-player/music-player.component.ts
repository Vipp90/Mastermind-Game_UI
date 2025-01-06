import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-music-player",
  standalone: true,
  imports: [],
  template: `
    <div class="audio-player">
      <audio #audioPlayer (ended)="playNextTrack()" controls>
        <source [src]="currentTrack" type="audio/mpeg" />
      </audio>
      <div class="controls">
        <button (click)="nextTrack()">Następny utwór</button>
      </div>
    </div>
  `,
  styles: `
  .audio-player {
  text-align: center;
  margin: 20px;
}
  `,
})
export class MusicPlayerComponent {
  player: HTMLAudioElement | undefined;
  @ViewChild("audioPlayer") set playerRef(ref: ElementRef<HTMLAudioElement>) {
    this.player = ref.nativeElement;
  }
  tracks: string[] = ["assets/music/0.mp3", "assets/music/1.mp3", "assets/music/2.mp3"];
  endGameTracks: string[] = ["assets/music/fanfary.mp3", "assets/music/loser.mp3"];
  currentTrack: string = "";
  currentTrackIndex = 0;

  play(): void {
    if (this.player) {
      this.player.play();
    }
  }

  stop(): void {
    if (this.player) {
      this.player.pause();
      this.player.currentTime = 0;
    }
  }

  playLoser(): void {
    this.currentTrack = this.endGameTracks[1];
    if (this.player) this.player.src = this.currentTrack;
    this.player?.load();
    this.play();
    this.player?.addEventListener("ended", () => {
      this.stop();
    });
  }

  playWin(): void {
    this.currentTrack = this.endGameTracks[0];
    if (this.player) this.player.src = this.currentTrack;
    this.player?.load();
    this.play();
    this.player?.addEventListener("ended", () => {
      this.stop();
    });
  }

  nextTrack(): void {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.currentTrack = this.tracks[this.currentTrackIndex];
    if (this.player) this.player.src = this.currentTrack;
    this.player?.load();
    this.play();
  }

  playNextTrack(): void {
    this.nextTrack();
  }
}
