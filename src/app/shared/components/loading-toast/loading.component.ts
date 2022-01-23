/* eslint-disable prettier/prettier */
import {
  Component
} from '@angular/core';

@Component({
  selector: '[loading-icon]',
  templateUrl: './loading.component.html',
  styles: [
    `
      svg {
        display: block;
        height: 100%;
        width: auto;
      }
    `,
  ],
})
export class LoadingComponent{
}
