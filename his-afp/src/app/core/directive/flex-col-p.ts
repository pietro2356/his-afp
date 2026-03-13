import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[hisFlexColP]',
})
export class FlexColP {
  private element = inject(ElementRef);

  constructor() {
    this.element.nativeElement.classList.add('flex');
    this.element.nativeElement.classList.add('flex-col');
    this.element.nativeElement.classList.add('p-4');
  }
}
