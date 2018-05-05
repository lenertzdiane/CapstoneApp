import { Injectable } from '@angular/core';

declare var jquery:any;
import * as d3 from 'd3';

import * as L from 'leaflet';
import { StandaloneComponent } from '../standalone/standalone.component'

declare var $ :any;

@Injectable()
export class D3Service {

  projectedArray: Array<object>;
  linePath: object;
  marker: object;
  counter: number;
  popups: Array<object>

  constructor() {
    this.projectedArray = [] as any;
    this.linePath = {} as any;
    this.marker = {} as any;
    this.popups = [] as any;
    this.svg = {} as any;

  }

  placeSVG(map) {
    console.log('yep')
    this.svg = d3.select(map.getPanes().overlayPane).append("svg");
    console.log(map)
  }

  removePrevious(map) {
    console.log(d3.select('g'))
    d3.select('g').remove()
  }

  readyMap(map, location) {
    this.marker = {} as any;
    let projectedArray = this.projectedArray as any;
    this.linePath = {} as any;

    let g = this.svg.append("g").attr("class", "character path");

    var dataLayer = L.geoJson(this.popups);
    dataLayer.addTo(map);
    var geoData = JSON.parse(location);

    // if(geoData.features.length < 2) {
    //   map.setZoom(18)
    // } else {
    //   map.setZoom(16)
    // }

    //linear scale for preserving scale
    //https://github.com/d3/d3-scale/blob/master/README.md#continuous-scales
    // var cscale = d3
    // .scale
    // .linear()
    // .domain([1, 3])
    // .range(["#ff0000", "#ff6a00", "#ffd800", "#b6ff00", "#00ffff", "#0094ff"]); //"#00FF00","#FFA500"

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

    let latitude = geoData.features[0].geometry.coordinates[0]
    let longitude = geoData.features[0].geometry.coordinates[1]

    map.panTo([longitude, latitude])

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

    // console.log(geoData)
    var bounds = path.bounds(geoData)
    let topLeft = bounds[0]
    let bottomRight = bounds[1]

    ptFeatures.attr("transform",
    function(d) {
      return "translate(" +
      applyLatLngToLayer(d).x + "," +
      applyLatLngToLayer(d).y + ")";
    });

    this.svg.attr("width", bottomRight[0] - topLeft[0] + 120)
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

    //if this is the splash page
    // this.linePath.style("stroke-width", 10)
    // this.timeTransition()
  }

  timeTransition(){
    console.log(this.linePath);
    transition(this.linePath);

    function transition(linePath) => {
              linePath.transition()
                  .duration(7500)
                  .attrTween("stroke-dasharray", tweenDash(linePath))
                  .each("end", function() {
                    console.log('not callin!!!!')
                      // d3.select(this).call(transition);// infinite loop
                  });
          } //end transition

          function tweenDash(linePath) => {
           return function(t) {
               //total length of path (single value)
               var l = linePath.node().getTotalLength();
               console.log(l)

               interpolate = d3.interpolateString("0," + l, l + "," + l);
               //t is fraction of time 0-1 since transition began
               var marker = d3.select("#marker");

               // p is the point on the line (coordinates) at a given length
               // along the line. In this case if l=50 and we're midway through
               // the time then this would 25.
               var p = linePath.node().getPointAtLength(t * l);

               //Move the marker to that point
               this.marker.attr("transform", "translate(" + p.x + "," + p.y + ")"); //move marker
               console.log(interpolate(t))
               return interpolate(t);
           }
       } //end tweenDash
}

  drawLine(map, scrollTop, text, location) {
    // let map = map
    // let actingVignette; //these allow me to compile but throw errors when scrolling
    // let actingChild;
    // let actingLast;
    // let actingLastNum;
    let marker = this.marker as any;
    let projectedArray = this.projectedArray
    let linePath = this.linePath as any;

    let txtHeight

    // console.log(location)
    let geoData = JSON.parse(location)



    // console.log(location)
    // projectedArray = projectedArray.slice((projectedArray.length - geoData.features.length), (projectedArray.length))
    // console.log(projectedArray)

    //this will become
    // map.on("viewreset", reset);
    // map.on("moveend", reset);
    // console.log(linePath)
    reset();

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
        if(number === 0) {
          return 0
        }
        else {
          // console.log(actingChild)
          return $(actingChild).position().top + scrollTop - (txtHeight)
        }
      }

      function makeLastPartPosition(scrollTop, actingLast) {
        if(actingLast.length === 0){
          // console.log('am i ever in here?')
          return 0
        } else {
          // console.log(actingLast.children())
          return $(actingLast.children()[0]).position().top + scrollTop - (txtHeight)
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
        // console.log(actingChild)
        var linePathScale = d3.scale.linear()
        .domain([makeLastPartPosition(scrollTop, actingLast), makePartPosition(scrollTop, number, actingChild)])
        .range([makeSegLength(lengthsArray, number-1), makeSegLength(lengthsArray, number)])
        .clamp(true);
        return linePathScale(scrollTop)
      }

      render()

      function render() {
        // console.log('in render')
        let length = linePath.node().getTotalLength()

        let vignetteElements = document.getElementsByClassName("read-vignette")


        for(let i = 0; i < vignetteElements.length; i ++) {
          // console.log($(elements[i]).position().top, $(window).innerHeight()))
          // console.log(i)
          //DIRTY HACK have to find something beetter than window height...
          let txt = document.getElementsByClassName("txt")
          txtHeight = $(txt).innerHeight()

          if($($(vignetteElements[i]).children().last()).position()){

          if($($(vignetteElements[i]).children().last()).position().top > txtHeight){
            let actingVignette = $(vignetteElements[i])
            break
          }
        }
        }

        //let elements be the children of the acting vignette
        let children = actingVignette.children().children()

        for(let i = 0; i < children.length; i ++) {
          // console.log($(elements[i]).position().top, $(window).innerHeight()))
          // console.log(i)
          //if children[i] has a div with an id i then thats the acting child
          // console.log(i)

          if($(children[i]).position().top > txtHeight){
            // if($(children[i]).has('div')){
            let actingChild = $(children[i])
            // console.log(actingChild)
            // }
            // console.log('actingChild')
            // console.log(actingChild)
            //this wont work between the last one of the last vignette and the first
            //one of the second vignette
            let actingLast = $(children[i - 1])
            let actingLastNum = i
            break
          }
        }

        linePath
        .style('stroke-dashoffset', function(d) {
          let num = actingLastNum
          return length - makeLinePathScale(scrollTop, num, actingChild, actingLast) + 'px';
        })
        .style('stroke-dasharray', length)
        .style('stroke-width', 5)
        // .style('stroke-width', function() {
        //   if(map.getZoom() > 16) {
        //     return 9
        //   } else if(14 < map.getZoom() < 16) {
        //     return 5
        //   } else {
        //     return 2
        //   }
        // })
        .style('stroke-dasharray', length)

        var p = linePath.node().getPointAtLength(length - parseInt(linePath.style('stroke-dashoffset')));
        marker.attr("transform", "translate(" + p.x + "," + p.y + ")");

        var svgPnt = L.point(p.x,p.y)
        var mapLatLng = map.layerPointToLatLng(svgPnt)
        map.panTo(mapLatLng)
      }
      window.requestAnimationFrame(render)

      // var marker2 = document.getElementById('marker')
      // console.log(typeof $(marker2).lngLat())
      // getPosition($(marker2))
    } // end reset

  };

  // //
  // //   //this is called from ngOnInit in map component, must find a way to import geJSON data
  // //   //probably from a model. should be something like import Popups from '../models/popups'
  // //   //then use popups.coordinates
  // //


  // //
  placeAnchors(map, anchors) {

  let popups = "{\"type\": \"FeatureCollection\",\"features\": ["
  let names = []
  let notes = []
  anchors.forEach(function(anchor) {
    popups += anchor.location;
    names.push(anchor.name);
    notes.push(anchor.notes)
  })

  let finishedPopups = popups.substring(0, popups.length-2)
  finishedPopups += " ] }"

  let geoJSONPopups = JSON.parse(finishedPopups)
  let counter = 0



let dataLayer = L.geoJson(geoJSONPopups, {
    pointToLayer: function (feature, latlng) {
      let popupText = names[counter] + '\n' + notes[counter]
      counter+=1
        return L.circleMarker(latlng, {'className': 'anchor'}).bindPopup(popupText);
    }
})
dataLayer.addTo(map);

}


placeMarkers(map, standalones) {
  let names = [];
  let text = [];

  let popups = "{\"type\": \"FeatureCollection\",\"features\": ["
  standalones.forEach(function(standalone) {
    popups += standalone.location;
    names.push(standalone.name);
    text.push(standalone.text);
  })

  let finishedPopups = popups.substring(0, popups.length-2)
  finishedPopups += " ] }"

  let geoJSONPopups = JSON.parse(finishedPopups)
  let counter = 0

  let dataLayer = L.geoJson(geoJSONPopups, {
      pointToLayer: function (feature, latlng) {
        let popupText = names[counter] + '\n' + text[counter]
        counter+=1
          return L.circleMarker(latlng, {'className': 'standalone'}).bindPopup(popupText);
      }
  })
  dataLayer.bringToFront();
  dataLayer.addTo(map);

//   //I think this is just leaflet stuff so does the d3 library work?
//   let dataLayer = L.geoJson(geoJSONPopups, {
//   onEachFeature: function(feature, layer) {
//     var popupText = names[counter] + text[counter]
//     + feature.geometry.coordinates;
//     counter +=1
//     layer.bindPopup(popupText);
//     layer.on("click", function() {
//     })
//   }
// });
// dataLayer.addTo(map)
}

placeInstructions(instructions, points, map) {

  let geoJSONPopups = JSON.parse(points)
  let counter = 0

  let dataLayer = L.geoJson(geoJSONPopups, {
      pointToLayer: function (feature, latlng) {
        let popupText = instructions[counter]
          return L.circleMarker(latlng, {'className': 'instructions'}).bindPopup(popupText);
          counter+=1
      }
  })
  dataLayer.addTo(map);

}

}
