import { Component, OnInit } from '@angular/core';
import { Anchor } from '../models/anchor'
import { AnchorService } from '../services/anchor.service'
import { MapService } from '../services/map.service'

@Component({
  selector: 'app-anchor',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.css']
})
export class AnchorComponent implements OnInit {

  newAnchor: Anchor;
  anchors: Anchors[];
  searchCriteria: string;
  feat: string;
  feature: string;


  constructor(private anchorService: AnchorService, private mapService: MapService) { }

  ngOnInit() {
    this.newAnchor = Anchor.CreateDefault();
    this.getAnchors()
    this.anchors = []
    this.searchCriteria = ''
    this.feat = ''
    this.feature = ''
  }

  ngAfterViewInit() {
    this.mapService.readyMarkerGroup()
  }

  setAnchor(event) {
    if(this.feat.length === 0) {
      let latlng = this.mapService.addAnchorMarker(event)

    this.feat = `{       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           ${latlng.lng},           ${latlng.lat}        ]       }     }, `
    this.feature = this.feat
  }
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
          this.mapService.removeMarkers()
          this.feat = ''
          console.log(this.anchors)
        }
      }
