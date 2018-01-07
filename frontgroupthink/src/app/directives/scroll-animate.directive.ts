import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { D3Service } from '../services/d3.service';


@Directive({
  selector: '[appScrollAnimate]',
})

export class ScrollAnimateDirective {
  constructor(private d3Service: D3Service, private el: ElementRef) {  }
  @Input() callback: Function;

  @HostListener('scroll') scroll($event) {
    this.callback(event.target.scrollTop, event.target);
  }


}
