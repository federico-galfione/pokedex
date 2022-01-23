import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nationalNum'
})
export class NationalNumPipe implements PipeTransform {
  transform(value: number): string {
    let num = value.toString();
    if(!num)
      return "#000";
    while (num.length < 3) num = "0" + num;
    return '#' + num;
  }

}
