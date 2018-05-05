import { Component, OnInit } from '@angular/core';
import { Anchor } from '../models/anchor'
import { AnchorService } from '../services/anchor.service'
import { MapService } from '../services/map.service'
import { D3Service } from '../services/d3.service'


@Component({
  selector: 'app-anchor',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.css']
})
export class AnchorComponent implements OnInit {

  newAnchor: Anchor;
  anchors: Anchor[];
  searchCriteria: string;
  feat: string;
  feature: string;
  anchorPlaced: boolean;
  anchorSet: boolean;

  constructor(private anchorService: AnchorService, private mapService: MapService, private d3Service: D3Service) { }

  ngOnInit() {
    this.newAnchor = Anchor.CreateDefault();
    this.getAnchors()
    this.anchors = []
    this.searchCriteria = ''
    this.feat = ''
    this.feature = '';
    this.anchorPlaced = false;
    this.anchorPlaced = false;

  }

  showAnchors() {
    if(!(this.anchorPlaced)){
      this.mapService.readyAnchorGroup()
      this.d3Service.placeAnchors(this.mapService.map, this.anchors)
      this.anchorPlaced = true
    }
  }

  hideAnchors() {
    console.log('in here')
    this.mapService.removeAnchors();
    this.anchorPlaced = false
  }

  setAnchor(event) {
    this.mapService.readyAnchorGroup()
    if(this.feat.length === 0) {
      let latlng = this.mapService.addAnchorMarker(event)
      this.feat = `{       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           ${latlng.lng},           ${latlng.lat}        ]       }     }, `
      this.feature = this.feat
      console.log(this.feature)
    }
    this.anchorSet = true
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


        insertNewAnchor() {
          if(this.anchorSet){
          this.newAnchor.location = this.feature
          this.anchorService
          .insertNewAnchor(this.newAnchor)
          .subscribe(
            data => {
              this.newAnchor._id = data.id;
              this.anchors.push(this.newAnchor);
              this.newAnchor = Anchor.CreateDefault();

              console.log("Added anchor.");
            }
          )
          this.mapService.removeAnchors()
          this.feat = ''
          console.log(this.anchors)
        } else {
          //ERROR REPORT
        }
          this.anchorSet = false
        }
      }
