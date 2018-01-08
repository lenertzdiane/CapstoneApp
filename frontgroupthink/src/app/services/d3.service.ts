import { Injectable } from '@angular/core';
import * as d3 from 'd3'
declare var jquery:any;
declare var $ :any;

@Injectable()
export class D3Service {

  constructor() {
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

    this.pathPoints = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              -87.65480518341064,
              41.79241661048939
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              -87.65474081039429,
              41.78699303451275
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              -87.6527452468872,
              41.78520107376093
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              -87.64624357223511,
              41.78513707423634
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              -87.64611482620239,
              41.78284904926622
            ]
          }
        }
      ]
    }
  }

readyMap(map) {

    var svg = d3.select(map.getPanes().overlayPane).append("svg");
    let g = svg.append("g").attr("class", "leaflet-zoom-hide");

    var dataLayer = L.geoJson(this.popups);
    dataLayer.addTo(map);

    var geoData = this.pathPoints;

    //linear scale for preserving scale
    //https://github.com/d3/d3-scale/blob/master/README.md#continuous-scales
    var cscale = d3.scale.linear().domain([1, 3]).range(["#ff0000", "#ff6a00", "#ffd800", "#b6ff00", "#00ffff", "#0094ff"]); //"#00FF00","#FFA500"


    //to make it black and white i kinda like!
    //this is where I'd take the street names off?
    // Use Leaflet to implement a D3 geometric transformation.


    var transform = d3.geo.transform({
      point: projectPoint,
    });

    //path: given a GeoJSON geometry or feature object, it generates an SVG path data string or renders the path to a Canvas.
    var path = d3.geo.path().projection(transform);

    var projectedArray = []

    var makeLine = d3.svg.line()
    .x(function(d) {return applyLatLngToLayer(d).x})
    .y(function(d) {return applyLatLngToLayer(d).y})
    .interpolate("linear");

    var linePath = g.selectAll(".lines")
    .data([geoData])
    .enter()
    .append("path")
    .attr("class", "lines")


    var ptFeatures = g.selectAll("circle")
    .data(geoData)
    .enter()
    .append("circle")
    .attr("r", 10)


    var marker = g.append("circle")
    .attr("r", 10)
    .attr("id", "marker")
    .attr("class", "travelMarker");
    marker.attr("transform",
    function() {
      console.log(geoData.features)
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

    linePath.attr("d", makeLine)
    // ptPath.attr("d", d3path);
    g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");
}


makeLine(map, scrollTop, text) {

//IM APPENDING A MILLION SVG GS




  //this will become
  // map.on("viewreset", reset);
  // map.on("moveend", reset);



  // var scrollTop = 0
  // var newScrollTop = 0
  //
  // scrollTop = scrollTop + 1
  reset();

  function reset() {



    // map.on("viewreset", change);
    // map.on("moveend", change);
    //
    // function change() {
    //   linePath
    //   .style('stroke-dashoffset', function(d) {
    //     return length - 0 + 'px';
    //   })
    //   .style('stroke-dasharray', length)
    //   //THIS IS A DIRTY HACK!
    //   scrollTop = scrollTop +1
    // }


    // again, not best practice, but I'm harding coding
    // the starting point


    // Setting the size and location of the overall SVG container



    let distance = 0
    let lengthsArray =[]

    // This is also kind of a dirty hack I should be able to reset projected array somewhere but.
    projectedArray = projectedArray.slice((projectedArray.length - geoData.length), (projectedArray.length))

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

    ///////////// ANIMATIONS
    let length = linePath.node().getTotalLength()

    function makeTestPosition(scrollTop, number) {
      if(number === 0) {
        return 0
      }
      else {
        return $('#'+number).position().top + scrollTop - ($(window).innerHeight())
      }
    }

    function makeLastTestPosition(scrollTop, number) {
      if(number === 0){
        return 0
      } else {

        return $('#' + number + '.last').position().top + scrollTop - ($(window).innerHeight())
      }
    }

    function makeSegLength(lengthsArray, number) {
      let total = 0
      if(number === 0) {
        return 0
      }
      else {
        for (let i = 0; i < number; i ++){
          total = total + lengthsArray[i]
        }
        return total
      }
    }

    function makeLinePathScale(scrollTop, number){
      var linePathScale = d3.scale.linear()
      .domain([makeLastTestPosition(scrollTop, number-1), makeTestPosition(scrollTop, number)])
      .range([makeSegLength(lengthsArray, number-1), makeSegLength(lengthsArray, number)])
      .clamp(true);
      return linePathScale(scrollTop)
    }

    if(scrollTop){
      console.log('scrollTop is defined')
      render;
    }

    var render = function () {


        // select all spans with class last

        let elements = $("span[class='last']");

        // let elements =[$('.last1'), $('.last2'), $('.last3'), $('.last4'), $('.last5')]

        for(i = 0; i < elements.length; i ++) {
          if($(elements[i]).position().top > $(window).innerHeight()){
            let actingElement = $(elements[i])
            console.log(actingElement)
            break
          }
        }

        linePath
        .style('stroke-dashoffset', function(d) {
          let num = parseInt(actingElement[0].id)
          return length - makeLinePathScale(scrollTop, num) + 'px';
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

        // console.log(linePath.style('stroke-dashoffset'));
        // console.log($('path')[0].attributes.style);

        var p = linePath.node().getPointAtLength(length - parseInt(linePath.style('stroke-dashoffset')));
        // console.log(p);
        marker.attr("transform", "translate(" + p.x + "," + p.y + ")");


      window.requestAnimationFrame(reset)
    }

    window.requestAnimationFrame(render)

  } // end reset


  // CHANGING LATLONG TO LEAFLET LATLONG //////////////////////////////////////////////////// //////////////////////////////////////




});

// //
// //   //this is called from ngOnInit in map component, must find a way to import geJSON data
// //   //probably from a model. should be something like import Popups from '../models/popups'
// //   //then use popups.coordinates
// //
  placeMarkers(d3map) {

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
  dataLayer.addTo(d3map)
  // });
}
// //
// // //have to find a way to send the d3 service access to the reader div so I can read
// // //jquery elements

// //
// // findText(text, scrollTop) {
// //   this.text = text
// // }
//
// readyPath(map) {
//   var cscale = d3.scale.linear().domain([1, 3]).range(["#ff0000", "#ff6a00", "#ffd800", "#b6ff00", "#00ffff", "#0094ff"]); //"#00FF00","#FFA500"
//
//   //to make it black and white i kinda like!
//   //this is where I'd take the street names off?
//
//   var transform = d3.geo.transform({
//     point: projectPoint,
//   });
//
//   //path: given a GeoJSON geometry or feature object, it generates an SVG path data string or renders the path to a Canvas.
//   var path = d3.geo.path().projection(transform);
//   console.log(path)
//
//   var projectedArray = []
//
//   var makeLine = d3.svg.line()
//   .x(function(d) {return applyLatLngToLayer(d).x})
//   .y(function(d) {return applyLatLngToLayer(d).y})
//   .interpolate("linear");
//
//   var linePath = this.g.selectAll(".lines")
//   .data([this.pathPoints])
//   .enter()
//   .append("path")
//   .attr("class", "lines")
//
//
//   var ptFeatures = this.g.selectAll("circle")
//   .data(this.pathPoints)
//   .enter()
//   .append("circle")
//   .attr("r", 0)
//
//
//   var marker = this.g.append("circle")
//   .attr("r", 10)
//   .attr("id", "marker")
//   .attr("class", "travelMarker")
//   .style("stroke", 3)
//   .style("color", "red")
//
//
//   // reset();
//
//   // //this will become
//   // map.on("viewreset", reset);
//   // map.on("moveend", reset);
//
// //hardcoding marker starting point i think
//   marker.attr("transform",
//  () => {
//     var y = this.pathPoints.features[0].geometry.coordinates[1]
//     var x = this.pathPoints.features[0].geometry.coordinates[0]
//     return "translate(" +
//     map.latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
//     map.latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
//   });
//
//     function projectPoint(x, y) {
//       var point = map.latLngToLayerPoint(new L.LatLng(y, x));
//       projectedArray.push([point.x, point.y])
//       this.stream.point(point.x, point.y);
//     }
//
//     function applyLatLngToLayer(d) {
//       var y = d.geometry.coordinates[1]
//       var x = d.geometry.coordinates[0]
//       return map.latLngToLayerPoint(new L.LatLng(y, x))
//     }
// }
//
// reset(map, scrollTop, text) {
//   var bounds = path.bounds(incidents),
//     topLeft = bounds[0],
//     bottomRight = bounds[1]
//
//     map.on("viewreset", change);
//     map.on("moveend", change);
//
//     function change() {
//       linePath
//       .style('stroke-dashoffset', function(d) {
//         return length - 0 + 'px';
//       })
//       .style('stroke-dasharray', length)
//       //THIS IS A DIRTY HACK!
//       scrollTop = scrollTop +1
//     }
//
//     ptFeatures.attr("transform",
//     function(d) {
//       return "translate(" +
//       applyLatLngToLayer(d).x + "," +
//       applyLatLngToLayer(d).y + ")";
//     });
//     // again, not best practice, but I'm harding coding
//     // the starting point
//
//
//     // Setting the size and location of the overall SVG container
//
//     svg.attr("width", bottomRight[0] - topLeft[0] + 120)
//     .attr("height", bottomRight[1] - topLeft[1] + 120)
//     .style("left", topLeft[0] - 50 + "px")
//     .style("top", topLeft[1] - 50 + "px");
//     // linePath.attr("d", d3path);
//
//     linePath.attr("d", makeLine)
//     // ptPath.attr("d", d3path);
//     g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");
//
//     let distance = 0
//     let lengthsArray =[]
//
//     // This is also kind of a dirty hack I should be able to reset projected array somewhere but.
//     projectedArray = projectedArray.slice((projectedArray.length - geoData.length), (projectedArray.length))
//
//     var getDistance = function getDistance(point1, point2) {
//       var xs = 0;
//       var ys = 0;
//
//       xs = point2[0] - point1[0];
//       xs = xs * xs;
//
//       ys = point2[1] - point1[1];
//       ys = ys * ys;
//
//       return Math.sqrt( xs + ys );
//     }
//
//     for (i = 0; i < projectedArray.length-1; i++) {
//       distance = getDistance(projectedArray[i], projectedArray[i+1]);
//       lengthsArray.push(distance);
//     }
//
//     ///////////// ANIMATIONS
//     let length = linePath.node().getTotalLength()
//
//     function makeTestPosition(scrollTop, number) {
//       if(number === 0) {
//         return 0
//       }
//       else {
//         return $('#'+number).position().top + scrollTop - ($(window).innerHeight())
//       }
//     }
//
//     function makeLastTestPosition(scrollTop, number) {
//       if(number === 0){
//         return 0
//       } else {
//
//         return $('#' + number + '.last').position().top + scrollTop - ($(window).innerHeight())
//       }
//     }
//
//     function makeSegLength(lengthsArray, number) {
//       let total = 0
//       if(number === 0) {
//         return 0
//       }
//       else {
//         for (let i = 0; i < number; i ++){
//           total = total + lengthsArray[i]
//         }
//         return total
//       }
//     }
//
//     function makeLinePathScale(scrollTop, number){
//       var linePathScale = d3.scale.linear()
//       .domain([makeLastTestPosition(scrollTop, number-1), makeTestPosition(scrollTop, number)])
//       .range([makeSegLength(lengthsArray, number-1), makeSegLength(lengthsArray, number)])
//       .clamp(true);
//       return linePathScale(scrollTop)
//     }
//
//     var render = function() {
//       if (scrollTop !== newScrollTop) {
//         scrollTop = newScrollTop
//
//         // select all spans with class last
//
//         let elements = $("span[class='last']");
//
//         // let elements =[$('.last1'), $('.last2'), $('.last3'), $('.last4'), $('.last5')]
//
//         for(i = 0; i < elements.length; i ++) {
//           if($(elements[i]).position().top > $(window).innerHeight()){
//             actingElement = $(elements[i])
//             break
//           }
//         }
//
//         linePath
//         .style('stroke-dashoffset', function(d) {
//           num = parseInt(actingElement[0].id)
//           return length - makeLinePathScale(scrollTop, num) + 'px';
//         })
//         .style('stroke-dasharray', length)
//         .style('stroke-width', function() {
//           if(map.getZoom() > 16) {
//             return 9
//           } else if(14 < map.getZoom < 16) {
//             return 5
//           } else {
//             return 2
//           }
//         })
//         .style('stroke-dasharray', length)
//
//         // console.log(linePath.style('stroke-dashoffset'));
//         // console.log($('path')[0].attributes.style);
//
//         var p = linePath.node().getPointAtLength(length - parseInt(linePath.style('stroke-dashoffset')));
//         // console.log(p);
//         marker.attr("transform", "translate(" + p.x + "," + p.y + ")");
//
//       }
//       window.requestAnimationFrame(reset)
//     }
//
//     window.requestAnimationFrame(render)
//
// }
//
//
// // we'll need to call this change function from map component on resize
// // function change() {
// //   linePath
// //   .style('stroke-dashoffset', function(d) {
// //     return length - 0 + 'px';
// //   })
// //   .style('stroke-dasharray', length)
// //   //THIS IS A DIRTY HACK!
// //   scrollTop = scrollTop +1
// // }

}
