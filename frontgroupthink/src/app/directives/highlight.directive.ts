import { Directive, HostListener, Input } from '@angular/core';
declare var jquery:any;
import {MapService} from '../services/map.service'

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {


  constructor(private mapService: MapService) {


  }
  @Input() textArray: Array<string>;


  @HostListener('mouseup') mouseup($event) {
    let text = document.getElementById("text-input")
    let start = text.selectionStart
    let end = text.selectionEnd
    let selection = text.value.slice(start, end)
    if(start<end){
      this.textArray.push(" " + selection)
    }
    $(text)[0].value = $(text)[0].value.slice(0, start) + $(text)[0].value.slice(end)

    // text = document.getElementById("text-input")

    let hiddenDiv = document.createElement('div'),
    content = null;

    text.classList.add('txtstuff');
    hiddenDiv.classList.add('hiddendiv', 'common');

    document.body.appendChild(hiddenDiv);
    // text = text.slice(highlighted, another)


      content = text.value;
      console.log(text)
      hiddenDiv.innerHTML = content + '\n\n';
      text.style.height = hiddenDiv.getBoundingClientRect().height + 'px';

//THIS IS A RIDICULOUS PLACE TO PUT THIS FUNCTION CALL, SHOULD BE ON SOME NG INIT SOMEWHERE BUT.


  }
    @HostListener('keyup') keyup($event) {

    let text = document.getElementById("text-input")

    let hiddenDiv = document.createElement('div'),
    content = null;

    text.classList.add('txtstuff');
    hiddenDiv.classList.add('hiddendiv', 'common');

    document.body.appendChild(hiddenDiv);
    // text = text.slice(highlighted, another)


      content = text.value;
      console.log(text)
      hiddenDiv.innerHTML = content + '\n\n';
      text.style.height = hiddenDiv.getBoundingClientRect().height + 'px';



    //push into text array

  }



}
