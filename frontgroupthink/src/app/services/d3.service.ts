import { Injectable } from '@angular/core';
import * as d3 from 'd3'
declare var jquery:any;
import * as L from 'leaflet'

declare var $ :any;

@Injectable()
export class D3Service {

  projectedArray: Array;
  linePath: object;
  marker: object;
  counter: number;

  constructor() {
    console.log('contructing')
    this.projectedArray =[]
    this.linePath = undefined
    this.marker = undefined

    this.popups = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              -87.6535713672638,
              41.790568806493454
            ]
          }
        }
      ]
    }

}
  readyMap(map, location) {
    let projectedArray = this.projectedArray
    // let linePath = this.linePath
    // let marker = this.marker

    // console.log(projectedArray)

    var svg = d3.select(map.getPanes().overlayPane).append("svg");
    let g = svg.append("g").attr("class", "leaflet-zoom-hide");

    var dataLayer = L.geoJson(this.popups);
    dataLayer.addTo(map);

    var geoData = JSON.parse(location);
    console.log(geoData)

    //linear scale for preserving scale
    //https://github.com/d3/d3-scale/blob/master/README.md#continuous-scales
    var cscale = d3.scale.linear().domain([1, 3]).range(["#ff0000", "#ff6a00", "#ffd800", "#b6ff00", "#00ffff", "#0094ff"]); //"#00FF00","#FFA500"

    var transform = d3.geo.transform({
      point: projectPoint,
    });

    //path: given a GeoJSON geometry or feature object, it generates an SVG path data string or renders the path to a Canvas.
    var path = d3.geo.path().projection(transform);

    this.projectedArray = []

    var makeLine = d3.svg.line()
    .x(function(d) { return applyLatLngToLayer(d).x})
    .y(function(d) { return applyLatLngToLayer(d).y})
    .interpolate("linear");

    this.linePath = g.selectAll(".lines")
    .data([geoData.features])
    .enter()
    .append("path")
    .attr("class", "lines")

    var ptFeatures = g.selectAll("circle")
    .data(geoData)
    .enter()
    .append("circle")
    .attr("r", 10)


    this.marker = g.append("circle")
    .attr("r", 10)
    .attr("id", "marker")
    .attr("class", "travelMarker");

    this.marker.attr("transform",
    function() {
      var y = geoData.features[0].geometry.coordinates[1]
      var x = geoData.features[0].geometry.coordinates[0]
      return "translate(" +
      map.latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
      map.latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
    });

    function projectPoint(x, y) {
      var point = map.latLngToLayerPoint(new L.LatLng(y, x));
      projectedArray.push([point.x, point.y])
      this.stream.point(point.x, point.y);
    }

    function applyLatLngToLayer(d) {
      // console.log('applylatlng')
      var y = d.geometry.coordinates[1]
      var x = d.geometry.coordinates[0]
      return map.latLngToLayerPoint(new L.LatLng(y, x))
    }
    var bounds = path.bounds(geoData)
    let topLeft = bounds[0]
    let bottomRight = bounds[1]

    ptFeatures.attr("transform",
    function(d) {
      return "translate(" +
      applyLatLngToLayer(d).x + "," +
      applyLatLngToLayer(d).y + ")";
    });

    svg.attr("width", bottomRight[0] - topLeft[0] + 120)
    .attr("height", bottomRight[1] - topLeft[1] + 120)
    .style("left", topLeft[0] - 50 + "px")
    .style("top", topLeft[1] - 50 + "px");
    // linePath.attr("d", d3path);

    this.linePath.attr("d", makeLine)
    // ptPath.attr("d", d3path);
    g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");

    var p = this.linePath.node().getPointAtLength(length - parseInt(this.linePath.style('stroke-dashoffset')));
    // console.log(p)
    this.marker.attr("transform", "translate(" + p.x + "," + p.y + ")");
    this.projectedArray = projectedArray
  }



  drawLine(map, scrollTop, text, location) {
    let marker = this.marker
    let projectedArray = this.projectedArray
    let linePath = this.linePath


    let geoData = JSON.parse(location)

    // console.log(location)
    // projectedArray = projectedArray.slice((projectedArray.length - geoData.features.length), (projectedArray.length))
    // console.log(projectedArray)

    //this will become
    // map.on("viewreset", reset);
    // map.on("moveend", reset);
    // console.log(linePath)
    reset(linePath);

    function reset() {

      let distance = 0
      let lengthsArray = []

      projectedArray = projectedArray.slice((projectedArray.length - geoData.features.length), (projectedArray.length))

      var getDistance = function getDistance(point1, point2) {
        var xs = 0;
        var ys = 0;

        xs = point2[0] - point1[0];
        xs = xs * xs;

        ys = point2[1] - point1[1];
        ys = ys * ys;

        return Math.sqrt( xs + ys );
      }

      for (let i = 0; i < projectedArray.length-1; i++) {
        distance = getDistance(projectedArray[i], projectedArray[i+1]);
        lengthsArray.push(distance);
      }

      function makePartPosition(scrollTop, number, actingChild) {
        console.log(actingChild)
        if(number === 0) {
          return 0
        }
        else {
          // console.log($(actingChild[0].childNodes[1][])
          // console.log(actingChild[0].position())
          // console.log($('#'+number).position().top + scrollTop - ($(window).innerHeight()))
          return $(actingChild).position().top + scrollTop - ($(window).innerHeight())
        }
      }

      function makeLastPartPosition(scrollTop, number, actingLast) {
        // console.log(actingChild[0].childNodes[1])
        if(number === 0){
          return 0
        } else {
          if(actingLast) {
            console.log(actingLast)
          return $(actingLast).position().top + scrollTop - ($(window).innerHeight())
        }
        }
      }

      function makeSegLength(lengthsArray, number) {
        let total = 0
        if(number === 0) {
          return 0
        }
        else {
          for (let i = 0; i < number; i ++){
            // console.log(lengthsArray)
            total = total + lengthsArray[i]
          }
          return total
        }
      }

      function makeLinePathScale(scrollTop, number, actingChild, actingLast){
        var linePathScale = d3.scale.linear()
        .domain([makeLastPartPosition(scrollTop, number-1, actingLast), makePartPosition(scrollTop, number, actingChild)])
        .range([makeSegLength(lengthsArray, number-1), makeSegLength(lengthsArray, number)])
        .clamp(true);
        return linePathScale(scrollTop)
      }

      render()

      function render() {

        let length = linePath.node().getTotalLength()

        let vignetteElements = document.getElementsByClassName("read-vignette")
        // console.log(elements)

        for(let i = 0; i < vignetteElements.length; i ++) {
          // console.log($(elements[i]).position().top, $(window).innerHeight()))
          // console.log(i)
          //DIRTY HACK have to find something beetter than window height...
          if($(vignetteElements[i]).position().top > $(window).innerHeight()-10000){
          let actingVignette = $(vignetteElements[i])
          // console.log('this is the acting element: ')
          // console.log(actingVignette)
          break
        }
        }

        //let elements be the children of the acting vignette
        let children = actingVignette.children()
        // console.log(children)

        for(let i = 0; i < children.length; i ++) {
          console.log('in here')
          // console.log($(elements[i]).position().top, $(window).innerHeight()))
          // console.log(i)
          console.log($(children[i]).position().top)
          console.log($(window).innerHeight())
          if($(children[i]).position().top > $(window).innerHeight()){
          let actingChild = $(children[i])
          //this wont work between the last one of the last vignette and the first
          //one of the second vignette
          let actingLast = $(children[i - 1])
          console.log(actingChild)
          break
        }
      }

      linePath
      .style('stroke-dashoffset', function(d) {
        let num = parseInt(actingChild[0].id)
        return length - makeLinePathScale(scrollTop, num, actingChild, actingLast) + 'px';
      })
      .style('stroke-dasharray', length)
      .style('stroke-width', function() {
        if(map.getZoom() > 16) {
          return 9
        } else if(14 < map.getZoom < 16) {
          return 5
        } else {
          return 2
        }
      })
      .style('stroke-dasharray', length)

      var p = linePath.node().getPointAtLength(length - parseInt(linePath.style('stroke-dashoffset')));
      marker.attr("transform", "translate(" + p.x + "," + p.y + ")");
    }
    window.requestAnimationFrame(render)
  } // end reset

};

// //
// //   //this is called from ngOnInit in map component, must find a way to import geJSON data
// //   //probably from a model. should be something like import Popups from '../models/popups'
// //   //then use popups.coordinates
// //
placeMarkers(map) {

//I think this is just leaflet stuff so does the d3 library work?
let dataLayer = L.geoJson(this.popups, {
onEachFeature: function(feature, layer) {
  var popupText = "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit</p>  "
  + feature.geometry.coordinates;
  layer.bindPopup(popupText);
  layer.on("click", function() {
  })
}
});
dataLayer.addTo(map)
}

}
