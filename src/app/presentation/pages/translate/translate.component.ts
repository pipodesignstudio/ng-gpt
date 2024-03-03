import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './translate.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default  class TranslateComponent { }
