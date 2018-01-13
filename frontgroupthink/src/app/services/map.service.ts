import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import * as L from "leaflet";

@Injectable()
export class MapService {
  public map: L.Map;
  public baseMaps: any;
  private vtLayer: any;
  private markerGroup: any;

  constructor(private http: Http) {
    this.markerGroup = {}
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

  readyMarkerGroup(){
    console.log('readying marker')
    console.log(this.map)
    this.markerGroup = L.layerGroup()
    console.log(this.markerGroup)
    this.markerGroup.addTo(this.map);
  }

  getLatLng(event) {
    let ll = this.map.mouseEventToLatLng(event)
    var marker = L.marker([ll.lat, ll.lng]).addTo(this.markerGroup);
    //if I wanted to do this part better i'd convert to geoJSON and pass back lol
    //console.log(marker.toGeoJSON())
    return ll
  }

  addStandaloneMarker(event) {
    this.markerGroup = L.layerGroup()
    this.markerGroup.addTo(this.map);

    let ll = this.map.mouseEventToLatLng(event)
    var marker = L.marker([ll.lat, ll.lng]).addTo(this.markerGroup);
    //if I wanted to do this part better i'd convert to geoJSON and pass back lol
    //console.log(marker.toGeoJSON())
    return ll
  }

  removeMarkers() {
    console.log('in remove')
    this.map.removeLayer(this.markerGroup)
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
