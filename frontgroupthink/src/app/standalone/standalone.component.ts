import { Component, OnInit } from '@angular/core';
import { Standalone } from '../models/standalone'
import { StandaloneService } from '../services/standalone.service'
import { MapService } from '../services/map.service'

@Component({
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.css']
})
export class StandaloneComponent implements OnInit {

  newStandalone: Standalone;
  standalones: Standalone[];
  features: string;
  feature: string;
  feat: string
  searchCriteria: string;

  constructor(private standaloneService: StandaloneService, private mapService: MapService) { }

  ngOnInit() {
    this.newStandalone = Standalone.CreateDefault();
    this.getStandalones()
    this.searchCriteria = '';
    this.feature = ''
    this.feat = ''
    this.standalones = []
  }


  setLocation(event) {
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
