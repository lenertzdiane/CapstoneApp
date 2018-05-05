import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import * as L from "leaflet";
import {D3Service} from './d3.service'

@Injectable()
export class MapService {
  public map: L.Map;
  public baseMaps: any;
  private vtLayer: any;
  private markerGroup: any;
  anchorGroup: any;

  constructor(private http: Http, private d3Service: D3Service) {
    this.markerGroup = {}
    this.anchorGroup = {}

    this.baseMaps = {
      // MapBox:L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      //   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      //   maxZoom: 18,
      //   id: 'mapbox.streets',
      //   accessToken: 'pk.eyJ1IjoibGVuZXJ0emQiLCJhIjoiY2pibDFhdHdpMHY2NDJxcWtrZjZodWlidSJ9.fBjof9UOXV117fVfw2H8vA'
      // }),
      OpenStreetMap: L.tileLayer("http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
    }),
    // Esri: L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
    //     attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    // }),
    // CartoDB: L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    // })
  };

}

placeInstructions(instructions, points, path) {
  let geoJSONPopups = JSON.parse(points)
  let counter = 0

  let dataLayer = L.geoJson(geoJSONPopups, {
      pointToLayer: function (feature, latlng) {
        let popupText = instructions[counter]
        counter+=1
          return L.circleMarker(latlng, {'className': 'instructions'}).bindPopup(popupText);
      }
  })


  // var marker = L.marker([  -87.6499557495117, 41.7924406075935]).addTo(this.map).bindPopup("Add paths to stories and see them animate when you scroll!");
  // marker.addTo(this.map)

  dataLayer.addTo(this.map);

  this.d3Service.readyMap(this.map, path)

}

readyMarkerGroup(){
  this.markerGroup = L.layerGroup()
  this.markerGroup.addTo(this.map);
}


readyAnchorGroup(){
  this.anchorGroup = L.layerGroup()
  this.anchorGroup.addTo(this.map);
}

getLatLng(event) {
  let ll = this.map.mouseEventToLatLng(event)
  if(event.target.localName != "path"){
    var marker = L.circleMarker([ll.lat, ll.lng]).addTo(this.markerGroup);
    //if I wanted to do this part better i'd convert to geoJSON and pass back lol
    //console.log(marker.toGeoJSON())

    return ll
  }
}

addAnchorMarker(event) {
  let ll = this.map.mouseEventToLatLng(event)
  var marker = L.circleMarker([ll.lat, ll.lng], {'className': 'anchor'}).addTo(this.anchorGroup);
  return ll
}

addStandaloneMarker(event) {
  this.markerGroup = L.layerGroup()
  this.markerGroup.addTo(this.map);

  let ll = this.map.mouseEventToLatLng(event)
  var marker = L.circleMarker([ll.lat, ll.lng], {'className': 'standalone'}).addTo(this.markerGroup);
  //if I wanted to do this part better i'd convert to geoJSON and pass back lol
  //console.log(marker.toGeoJSON())
  return ll
}

removeMarkers() {
  this.map.removeLayer(this.markerGroup)
}

removeAnchors() {
  this.map.removeLayer(this.anchorGroup)
}




// disableMouseEvent(elementId: string) {
//     let element = <HTMLElement>document.getElementById(elementId);
//
//     L.DomEvent.disableClickPropagation(element);
//     L.DomEvent.disableScrollPropagation(element);
// }

// toggleAirPortLayer() {
//   if (this.vtLayer) {
//       this.map.removeLayer(this.vtLayer);
//       delete this.vtLayer;
//   } else {
//       this.http.get("https://rawgit.com/haoliangyu/angular2-leaflet-starter/master/public/data/airports.geojson")
//           .map(res => res.json())
//           .subscribe(result => {
//               this.vtLayer = L.vectorGrid.slicer(result);
//               this.vtLayer.addTo(this.map);
//           });
//   }
}
