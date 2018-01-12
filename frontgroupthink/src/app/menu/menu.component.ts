import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  show: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapse() {
   this.show = !this.show
 }

}
