import { Component, OnInit } from '@angular/core';
import { Standalone } from '../models/standalone'
import { StandaloneService } from '../services/standalone.service'

@Component({
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.css']
})
export class StandaloneComponent implements OnInit {

  newStandalone: Standalone;

  constructor(private standaloneService: StandaloneService) { }

  ngOnInit() {
    this.newStandalone = Standalone.CreateDefault();
  }

  insertNewStandalone() {
    this.standaloneService
    .insertNewStandalone(this.newStandalone)
    .subscribe(
      data => {
         this.newStandalone._id = data.id;
         this.standalones.push(this.newStandalone);
         this.newStandalone = Standalone.CreateDefault();

         console.log("Added standalone.");
      }
    )
  }

}
