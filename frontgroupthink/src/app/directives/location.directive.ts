// import { Directive, HostListener, Input } from '@angular/core';
// declare var jquery:any;
// import { MapService } from "../services/map.service";
//
//
//
// @Directive({
//   selector: '[appLocation]'
// })
// export class LocationDirective {
//
//
//   constructor() {
//
//
//   }
//
//   @Input() features: Array;
//
//   @HostListener('mouseup') mouseup($event) {
//     console.log('inside location directive')
//
//
//     let latlng = this.mapService.getLatLng(event)
//     console.log(latlng.lat)
//     console.log(latlng.lng)
//
//
//     let feature = `{       \"type\": \"Feature\",       \"properties\": {},       \"geometry\": {         \"type\": \"Point\",         \"coordinates\": [           ${latlng.lng},           ${latlng.lat}        ]       }     }`
//     this.features.push(feature)
//     console.log(this.features)
//
//
//   }
//
//
//
// }
