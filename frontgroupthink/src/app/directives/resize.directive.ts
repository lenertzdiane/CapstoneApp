// import { Directive, HostListener, Input } from '@angular/core';
// import { D3Service } from '../services/d3.service'
// import { MapService } from '../services/map.service'
// import { Standalone } from '../models/standalone'
//
//
// @Directive({
//   selector: '[appResize]'
// })
// export class ResizeDirective {
//
//   constructor(private d3Service: D3Service, private mapService: MapService) { }
//   @Input() callback: Function;
//   @Input() standalones: Standalone[];
//
//   @HostListener('click') resize($event) {
//     console.log('in hostlistener')
//     if($(event.target).hasClass("standalone")){
//       console.log($(event.target).attr("fill", "red"))
//       console.log($(event.target).attr("stroke", "red")) //[0].attributes.stroke.val
//        //[0].attributes.stroke.val
//     }
//     console.log($(event.target)
//     // this.d3Service.resetMap(this.mapService.map)
//     // this.d3Service.readyMap(this.mapService.map, standalones)
//   },
// }
