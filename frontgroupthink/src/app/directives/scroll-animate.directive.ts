import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { D3Service } from '../services/d3.service';
import { Vignette } from '../models/vignette';
declare var jquery:any;



@Directive({
  selector: '[appScrollAnimate]',
})

export class ScrollAnimateDirective {
  constructor(private d3Service: D3Service, private el: ElementRef) {  }
  @Input() callback: Function;

  @HostListener('scroll') scroll($event) {
    let vignetteElements = document.getElementsByClassName("read-vignette")
    for(let i = 0; i < vignetteElements.length; i ++) {
      // console.log($(elements[i]).position().top, $(window).innerHeight()))
      // console.log(i)
      //DIRTY HACK have to find something beetter than window height...
      let txt = document.getElementsByClassName("txt")
      let txtHeight = $(txt).innerHeight()

      if($($(vignetteElements[i]).children().last()).position()){

      if($($(vignetteElements[i]).children().last()).position().top > txtHeight){
        let workingVignette = $(vignetteElements[i])
        break
      }
    }
  }
    // console.log(event.path[0].children)
    // console.log(event.path[0].children[1].scrollTop)
    this.callback((<Element>event.target).scrollTop, event.target, workingVignette);
  }


}
