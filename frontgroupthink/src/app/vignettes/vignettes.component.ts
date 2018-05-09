import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { Vignette } from '../models/vignette';
import { Anchor } from '../models/anchor';
import { VignetteService } from '../services/vignettes.service';
import { AnchorService } from '../services/anchor.service';

import * as L from "leaflet";
import { MapService } from "../services/map.service";
import { D3Service } from "../services/d3.service";


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
  anchors: Anchor[];
  anchorsPlaced: boolean;
  vignette: Vignette;


  constructor(
    private vignetteService: VignetteService,
    private mapService: MapService,
    private d3Service: D3Service,
    private anchorService: AnchorService,

  ) { }

  ngOnInit() {
    this.newVignette = Vignette.CreateDefault();
    this.searchCriteria = '';
    this.getVignettes(); // I shouldn't have to do this right?
    this.getAnchors();
    this.textArray = [];
    this.editPart = '';
    this.index = 0;
    this.features = '[';
    this.vignettes = [];
    this.anchors = []
    this.anchorsPlaced = false

  }

  ngAfterViewInit() {
    this.mapService.readyMarkerGroup()
  }

  showAnchors() {
    if(!this.anchorsPlaced){
      this.mapService.readyAnchorGroup()
      if(this.anchors){
        this.d3Service.placeAnchors(this.mapService.anchorGroup, this.anchors)
        this.anchorsPlaced = true
      }
    }
  }

  hideAnchors() {
    this.mapService.removeAnchors();
    this.anchorsPlaced = false
  }


  setLocation(event) {
    if(this.mapService.getLatLng(event)){
    let latlng = this.mapService.getLatLng(event)

    let feature = //`{       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           ${latlng.lng},           ${latlng.lat}        ]       }    } , `
    `{
  \"type\": \"Feature\",
  \"properties\": {},
  \"geometry\": {
    \"type\": \"Point\",
    \"coordinates\": [
      ${latlng.lng},
      ${latlng.lat}
    ]
  }
},`
    this.features += feature
  }
  }

  removeMarkers(){
    this.mapService.removeMarkers()
    // this.features = '['
    this.mapService.readyMarkerGroup()

  }

  deletePart(i) {
    this.textArray.splice(i, 1)
  }

  attatchPart(part, i){
    this.textArray[i] = "@"+part
  }

  detatchPart(part, i){
    this.textArray[i] = part.substring(1, part.length)
  }

  setEditPart(part, index) {
    this.editPart = part
    this.index = index
  }


  insertNewVignette() {
    let points = "{\"type\": \"FeatureCollection\", \"features\":" + this.features.substring(0, this.features.length - 1) + "] }"
    this.newVignette.location = points
    this.newVignette.order = this.vignettes.length + 1
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
    this.mapService.readyMarkerGroup()

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
              element.location,
              element.order)
              this.vignettes.push(newVignette);
            })
          })
        }
        getAnchors(){
          this.anchorService.getAnchors(this.searchCriteria)
          .subscribe(
            data => {
              this.anchors = [];
              data.forEach(
                element => {
                  var newAnchor = new Anchor(element._id,
                    element.name,
                    element.notes,
                    element.characters,
                    element.location)
                    this.anchors.push(newAnchor);
                  })
                })
              }




            }
