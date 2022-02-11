import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorgreen]'
})
export class ColorgreenDirective {

  constructor(private el:ElementRef) {
    this.el.nativeElement.style.color='green'
   }

}
