import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MapService } from "../services/map.service";
import { D3Service } from '../services/map.service'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() scrollTop: number;

  constructor(private mapService: MapService) { }

  ngOnInit() {

    let map = L.map("map", {
      zoomControl: false,
      center: L.latLng(41.79, -87.65),
      zoom: 13,
      minZoom: 8,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    // L.control.zoom({ position: "topright" }).addTo(map);
    // L.control.layers(this.mapService.baseMaps).addTo(map);
    // L.control.scale().addTo(map);

    this.mapService.map = map;

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("something")
    console.log(changes['scrollTop'])
  }


}
