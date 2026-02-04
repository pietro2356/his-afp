import { AfterViewChecked, Component, ElementRef, input, viewChild } from '@angular/core';

export type THex = string & { readonly __brand: 'hex' };

@Component({
  selector: 'app-color-box',
  imports: [],
  templateUrl: './color-box.html',
  styleUrl: './color-box.css',
})
export class ColorBox implements AfterViewChecked {
  colorHex = input.required<THex>();
  readonly waitBox = viewChild.required<ElementRef>('waitbox');

  ngAfterViewChecked() {
    this.waitBox().nativeElement.style.setProperty('background-color', this.colorHex());
  }
}
