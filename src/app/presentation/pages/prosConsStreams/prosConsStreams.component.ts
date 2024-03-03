import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pros-cons-streams',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './prosConsStreams.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamsComponent { }
