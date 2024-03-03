import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-audio-to-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './audioToPage.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToPageComponent { }
