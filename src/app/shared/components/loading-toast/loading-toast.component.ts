import { Component, HostBinding, Input } from '@angular/core';
import { enterFromTopAnimation } from '../../animations/generic.animations';

@Component({
  selector: 'app-loading-toast',
  templateUrl: './loading-toast.component.html',
  styleUrls: ['./loading-toast.component.scss'],
  animations: [enterFromTopAnimation],
})
export class LoadingToastComponent {
  @HostBinding('@enterFromTopAnimation') get getEnterFromTopAnimation() {
    return true;
  }
  @Input()
  message: string | null = null;
}
