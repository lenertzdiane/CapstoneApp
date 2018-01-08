import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MapService } from "../services/map.service";
import { D3Service } from '../services/d3.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() text: object;
  @Input() scrollTop: number;

  constructor(private mapService: MapService, private d3Service: D3Service) { }

  ngOnInit() {

    let map = L.map("map", {
      zoomControl: false,
      center: L.latLng(41.79, -87.65),
      zoom: 15,
      minZoom: 8,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    // L.control.zoom({ position: "topright" }).addTo(map);
    // L.control.layers(this.mapService.baseMaps).addTo(map);
    // L.control.scale().addTo(map);
    let scrollTop = undefined
    this.mapService.map = map;
    // this.d3Service.readyMap(this.mapService.map);
    this.d3Service.placeMarkers(this.mapService.map)
    this.d3Service.readyMap(this.mapService.map)
  }

  ngOnChanges(changes: SimpleChanges) {
    let scrollTop = changes.scrollTop.currentValue
    this.d3Service.drawLine(this.mapService.map, scrollTop, this.text)

    // this.d3Service.findText(this.text, scrollTop)
    // this.d3Service.reset(this.mapService.map, scrollTop, this.text)
  }


}
