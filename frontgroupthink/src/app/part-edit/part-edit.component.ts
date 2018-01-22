import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-part-edit',
  templateUrl: './part-edit.component.html',
  styleUrls: ['./part-edit.component.css']
})
export class PartEditComponent implements OnInit {
  @Input() editPart: string;
  @Input() index: number;
  @Input() textArray: Array<string>;



  constructor() { }

  ngOnInit() {

  }

  updatePart(editPart, index, textArray) {
    textArray[index] = editPart
    editPart = ''
    console.log(editPart)
  }

}
