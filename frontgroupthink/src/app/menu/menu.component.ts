import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, group, query, stagger, keyframes} from '@angular/animations'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('myAnimation', [
      state('true', style({
        'transform': 'translateY(-200%)'
      })
    ),
    transition('true => false',
    animate('350ms', style({ transform: 'translateX(0)'})))
  ]),
  trigger('myAnimation2', [
    state('true', style({
      'transform': 'translateY(-400%)'
    })
  ),
  transition('true => false',
  animate('350ms', style({ transform: 'translateX(0)'})))
]),
trigger('myAnimation3', [
  state('true', style({
    'transform': 'translateY(-600%)'
  })
),
transition('true => false',
animate('350ms', style({ transform: 'translateX(0)'})))
]),
trigger('myAnimation4', [
  state('true', style({
    'transform': 'translateY(-800%)'
  })
),
transition('true => false',
animate('350ms', style({ transform: 'translateX(0)'})))
])

]
})

export class MenuComponent implements OnInit {
  state: boolean = true;


  constructor() { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.state = !this.state
    console.log(this.state)
  }


}
