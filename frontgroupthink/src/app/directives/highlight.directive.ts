import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {


  constructor() {}
  @Input() textArray: Array;

  @HostListener('mouseup') mouseup($event) {
    let text = document.getElementById("text-input")
    let start = text.selectionStart
    let end = text.selectionEnd
    let selection = text.value.slice(start, end)
    if(start<end){
      this.textArray.push(selection)
    }
    $(text)[0].value = $(text)[0].value.slice(0, start) + $(text)[0].value.slice(end)
    // text = text.slice(highlighted, another)

    //push into text array

  }



}
