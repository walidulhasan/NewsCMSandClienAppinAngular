import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appcustomstyle]'
})
export class CustomstyleDirective {

  constructor(private el:ElementRef) {
    this.el.nativeElement.style.color='red'
   }

}
