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
  textArray: Array<string>;
  editPart: string;
  index: number;
  features: string;


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
    this.features = '['

  }

  setLocation(event) {
    console.log(event)

    let latlng = this.mapService.getLatLng(event)

    let feature = `{       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           ${latlng.lng},           ${latlng.lat}        ]       }     }, `
    this.features += feature
  }

  removeMarkers(){
    this.mapService.removeMarkers()
    this.features = '['
  }

  deletePart(i) {
    this.textArray.splice(i, 1)
  }

  setEditPart(part, index) {
    this.editPart = part
    this.index = index
  }


  insertNewVignette() {
    let points = "{\"type\": \"FeatureCollection\", \"features\":" + this.features.substring(0, this.features.length - 2) + "] }"
    console.log(points)
    this.newVignette.location = points
    this.vignetteService
    .insertNewVignette(this.newVignette)
    .subscribe(
      data => {
        this.newVignette._id = data.id;
        this.vignettes.push(this.newVignette);
        this.newVignette = Vignette.CreateDefault();
      }
    )
    this.features = ''
    this.textArray = []
    this.mapService.removeMarkers()
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
