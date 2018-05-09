import { Directive, HostListener, Input } from '@angular/core';
declare var jquery:any;
import {MapService} from '../services/map.service'
declare var $ :any;

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {


  constructor(private mapService: MapService) {


  }
  @Input() textArray: Array<string>;


  @HostListener('mouseup') mouseup($event) {
    let text = $(document.getElementById("text-input"))
    let start = text[0].selectionStart
    let end = text[0].selectionEnd
    let selection = text[0].value.slice(start, end)
    if(start<end){
      this.textArray.push(" " + selection)
    }

    console.log(text)
    text[0].value = text[0].value.slice(0, start) + $(text)[0].value.slice(end)

    // text = document.getElementById("text-input")

    let hiddenDiv = document.createElement('div'),
    content = null;

    text[0].classList.add('txtstuff');
    hiddenDiv.classList.add('hiddendiv', 'common');

    document.body.appendChild(hiddenDiv);
    // text = text.slice(highlighted, another)


      content = text[0].value;
      console.log(text)
      hiddenDiv.innerHTML = content + '\n\n';
      text[0].style.height = hiddenDiv.getBoundingClientRect().height + 'px';

//THIS IS A RIDICULOUS PLACE TO PUT THIS FUNCTION CALL, SHOULD BE ON SOME NG INIT SOMEWHERE BUT.


  }
    @HostListener('keyup') keyup($event) {

    let text = $(document.getElementById("text-input"))

    let hiddenDiv = document.createElement('div'),
    content = null;

    text[0].classList.add('txtstuff');
    console.log(hiddenDiv)
    hiddenDiv.classList.add('hiddendiv', 'common');

    document.body.appendChild(hiddenDiv);
    // text = text.slice(highlighted, another)


      content = text[0].value;
      console.log(text)
      hiddenDiv.innerHTML = content + '\n\n';
      text[0].style.height = hiddenDiv.getBoundingClientRect().height + 'px';



    //push into text array

  }



}
