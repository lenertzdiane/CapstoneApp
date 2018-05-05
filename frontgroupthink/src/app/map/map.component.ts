import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MapService } from "../services/map.service";
import { D3Service } from '../services/d3.service';
import { Vignette } from '../models/vignette';
import { Standalone } from '../models/standalone';
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
  @Input() features: Array<string>
  @Input() standalones: Standalone[];
  map: object;

  constructor(private mapService: MapService, private d3Service: D3Service) { }

  ngOnInit() {
    this.features = []

    let map = L.map("map", {
      zoomControl: false,
      center: L.latLng(41.79, -87.65),
      zoom: 17,
      // minZoom: 8,
      // maxZoom: 18,
      layers: L.tileLayer("http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png" //, {
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      // [this.mapService.baseMaps.OpenStreetMap]
    });


    this.map = map;
    this.mapService.map = map;
    this.standalones = [];
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    // this.d3Service.readyMap(this.mapService.map) //this.actingVignette.location);
    // this.d3Service.(this.mapService.map) //this.actingVignette.location);
    // this.d3Service.placeMarkers(this.mapService.map) // this.actingVignette.location)
  }


  //when a new vignette is actingVignette


  ngOnChanges(changes: SimpleChanges) {
    console.log()

    if(changes['actingVignette'] && changes['actingVignette'].currentValue != undefined) {
      // let scrollTop = changes.scrollTop.currentValue
      if(changes['actingVignette'].previousValue == undefined) {
      console.log(this.mapService.map)
      this.d3Service.placeSVG(this.mapService.map)

        this.d3Service.readyMap(this.mapService.map, this.actingVignette.location, this.standalones);
        this.d3Service.placeMarkers(this.mapService.map, this.standalones)
      }
      if(changes['actingVignette'].previousValue._id != changes['actingVignette'].currentValue._id){
        this.d3Service.removePrevious(this.mapService.map)
        this.d3Service.readyMap(this.mapService.map, this.actingVignette.location, this.standalones);
    };
      // this.d3Service.drawLine(this.mapService.map, scrollTop, this.text, this.actingVignette.location)

    }


    if(changes['scrollTop'] && changes['scrollTop'].currentValue != undefined) {
      let scrollTop = changes.scrollTop.currentValue
      this.d3Service.drawLine(this.mapService.map, scrollTop, this.text, this.actingVignette.location, this.standalones)

    }
  }


}
