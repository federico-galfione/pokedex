import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KpiComponent } from './components/kpi/kpi.component';
import { LoadingToastComponent } from './components/loading-toast/loading-toast.component';
import { LoadingComponent } from './components/loading-toast/loading.component';
import { LoadingDirective } from './directives';
import { NationalNumPipe } from './pipes/national-num.pipe';



@NgModule({
  declarations: [LoadingComponent, LoadingToastComponent, LoadingDirective, KpiComponent, NationalNumPipe],
  imports: [
    CommonModule
  ],
  exports: [LoadingDirective, KpiComponent, NationalNumPipe]
})
export class SharedModule { }
