import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Vignette } from '../models/vignette';
import { VignetteService } from '../services/vignettes.service';
import * as L from "leaflet";

@Component({
  selector: 'vignettes',
  templateUrl: './vignettes.component.html',
})
export class VignetteComponent implements OnInit {
  newVignette: Vignette;
  vignettes: Vignette[];
  searchCriteria: string;
  textArray: Array;

  constructor(
    private vignetteService: VignetteService,

  ) { }

  ngOnInit() {
    this.newVignette = Vignette.CreateDefault();
    this.searchCriteria = '';
    this.getVignettes(); // I shouldn't have to do this right?
    this.textArray = []
  }

  insertNewVignette() {
    this.vignetteService
    .insertNewVignette(this.newVignette)
    .subscribe(
      data => {
        this.newVignette._id = data.id;
        this.vignettes.push(this.newVignette);
        this.newVignette = Vignette.CreateDefault();
      }
    )
  }

  getVignettes(){
    this.vignetteService.getVignettes(this.searchCriteria)
    .subscribe(
      data => {
        this.vignettes = [];
        data.forEach(
          element => {
            var newVignette = new Vignette(element._id,
              element.name,
              element.text,
              element.characters,
              element.location)
              this.vignettes.push(newVignette);
            })
          })
        }




      }
