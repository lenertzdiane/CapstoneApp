import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MapService } from "../services/map.service";
import { D3Service } from '../services/d3.service'
import * as L from "leaflet";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  // features: Array;
  @Input() text: object;
  @Input() scrollTop: number;
  @Input() actingVignette: Vignette;
  @Input() features: Array
  @Input() standalones: Standalone[];

  constructor(private mapService: MapService, private d3Service: D3Service) { }

  ngOnInit() {
    this.features = []

    let map = L.map("map", {
      zoomControl: false,
      center: L.latLng(41.79, -87.65),
      zoom: 17,
      minZoom: 8,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    this.mapService.map = map;
    this.standalones = {};
    // this.d3Service.readyMap(this.mapService.map) //this.actingVignette.location);
    // this.d3Service.placeMarkers(this.mapService.map) // this.actingVignette.location)
  }


  //when a new vignette is actingVignette

  ngOnChanges(changes: SimpleChanges) {
    if(changes['actingVignette'] && changes['actingVignette'].currentValue != undefined) {
      console.log(changes['actingVignette'])
      console.log(changes)
      this.d3Service.readyMap(this.mapService.map, this.actingVignette.location);
      this.d3Service.placeMarkers(this.mapService.map, this.standalones)
      this.d3Service.drawLine(this.mapService.map, scrollTop, this.text, this.actingVignette.location)

    }

    if(changes['scrollTop'] && changes['scrollTop'].currentValue != undefined) {
      let scrollTop = changes.scrollTop.currentValue
      this.d3Service.drawLine(this.mapService.map, scrollTop, this.text, this.actingVignette.location)
    }
  }


}
