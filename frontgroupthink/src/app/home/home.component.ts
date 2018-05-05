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
  this.instructions = ["attatch ongoing narratives to a path on the map", "attatch standalone stories to points on the map", ]
  this.points = "{\"type\": \"FeatureCollection\",\"features\": [{  \"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [-87.65401124954224,41.792640583111805]}}, {  \"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [-87.64899015426634, 41.788848941062334]}}]}"
  this.map = this.mapService.map
  this.path = "{\"type\": \"FeatureCollection\",\"features\": [{  \"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [ -87.65235900878906, 41.790632800595844]}}, {  \"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [  -87.6524019241333, 41.79239261337629]}}, {  \"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [  -87.65120029449463, 41.7924246095251]}}, {  \"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Point\",\"coordinates\": [-87.6499557495117, 41.7924406075935]}}]}"

}
  ngOnInit() {
  }

  placeInstructions() {
    this.mapService.placeInstructions(this.instructions, this.points, this.path)
}
}
