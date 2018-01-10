import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {


  constructor() {}
  @Input() part: String;

  @HostListener('click') click($event) {
    console.log(part)
  }



}
