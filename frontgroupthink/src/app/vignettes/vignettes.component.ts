import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Vignette } from '../models/vignette';
import { VignetteService } from '../services/vignettes.service';
import * as L from "leaflet";
import { MapService } from "../services/map.service";


@Component({
  selector: 'vignettes',
  templateUrl: './vignettes.component.html',
})
export class VignetteComponent implements OnInit {
  newVignette: Vignette;
  vignettes: Vignette[];
  searchCriteria: string;
  textArray: Array;
  editPart: string;
  index: number;
  features: Array;

  constructor(
    private vignetteService: VignetteService,
    private mapService: MapService

  ) { }

  ngOnInit() {
    this.newVignette = Vignette.CreateDefault();
    this.searchCriteria = '';
    this.getVignettes(); // I shouldn't have to do this right?
    this.textArray = []
    this.editPart = ''
    this.index = 0
  }

  deletePart(i) {
    this.textArray.splice(i, 1)
  }

  setEditPart(part, index) {
    this.editPart = part
    this.index = index
    console.log(this.editPart)
  }

  setPoint(event) {
    let latlng = this.mapService.getLatLng(event)

    let feature = `{       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           ${latlng.lat},           ${latlng.long}        ]       }     },`
    features.push(feature)


  }

  insertNewVignette() {
    console.log(this.textArray)
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
