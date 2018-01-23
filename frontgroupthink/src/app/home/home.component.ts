import { Component, OnInit } from '@angular/core';
import { D3Service } from '../services/d3.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private d3Service: D3Service, private mapService: MapService) {
  this.instructions = ["attatch standalone stories to points on the map", "attatch ongoing narratives to a path on the map", "manage the order of your stories", "filter by character" ]
  this.points = "{\"type\": \"FeatureCollection\",\"features\": [{  \"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [-87.64899015426634, 41.788848941062334 ]}}, {  \"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [-87.6509642601013, 41.79470429401854]}}, {  \"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [-87.64899015426634, 41.788848941062334]}}]}"
  this.map = this.mapService.baseMaps
}
  ngOnInit() {
    // this.d3Service.placeInstructions(this.instructions, this.points, this.map)
  }

}
