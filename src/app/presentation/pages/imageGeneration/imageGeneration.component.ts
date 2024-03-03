import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-image-generation',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './imageGeneration.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationComponent { }
