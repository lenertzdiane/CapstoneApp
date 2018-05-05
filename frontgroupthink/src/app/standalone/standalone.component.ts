import { Component, OnInit } from '@angular/core';
import { Standalone } from '../models/standalone'
import { Anchor } from '../models/anchor'

import { StandaloneService } from '../services/standalone.service'
import { MapService } from '../services/map.service'
import { D3Service } from '../services/d3.service'
import { AnchorService } from '../services/anchor.service'



@Component({
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.css']
})
export class StandaloneComponent implements OnInit {

  newStandalone: Standalone;
  standalones: Standalone[];

  features: String;
  feature: string;
  feat: string;
  searchCriteria: string;
  anchors: Anchor[];
  anchorsPlaced: boolean;



  constructor(private anchorService: AnchorService, private standaloneService: StandaloneService, private mapService: MapService, private d3Service: D3Service) { }

  ngOnInit() {
    this.newStandalone = Standalone.CreateDefault();
    this.getStandalones();
    this.anchors = []
    this.getAnchors();
    this.searchCriteria = '';
    this.feature = ''
    this.feat = ''
    this.standalones = [];
    this.anchorsPlaced = false;



  setLocation(event) {
    console.log('in setlocation')
    if(this.feat.length === 0) {
      let latlng = this.mapService.addStandaloneMarker(event)

      this.feat = `{       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           ${latlng.lng},           ${latlng.lat}        ]       }     }, `
    this.feature = this.feat
  }
  }

  removeMarkers(){
    this.mapService.removeMarkers()
    this.feat = ''
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

  getStandalones(){
    this.standaloneService.getStandalones(this.searchCriteria)
    .subscribe(
      data => {
        this.standalones = [];
        data.forEach(
          element => {
            var newStandalone = new Standalone(element._id,
              element.name,
              element.text,
              element.characters,
              element.location)
              this.standalones.push(newStandalone);
            })
          })
        }


        insertNewStandalone() {
          this.newStandalone.location = this.feature
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
          this.mapService.removeMarkers()
          this.feat = ''

        }

      }
