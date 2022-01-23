import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingToastComponent } from './components/loading-toast/loading-toast.component';
import { LoadingComponent } from './components/loading-toast/loading.component';
import { LoadingDirective } from './directives';



@NgModule({
  declarations: [LoadingComponent, LoadingToastComponent, LoadingDirective],
  imports: [
    CommonModule
  ],
  exports: [LoadingDirective]
})
export class SharedModule { }
