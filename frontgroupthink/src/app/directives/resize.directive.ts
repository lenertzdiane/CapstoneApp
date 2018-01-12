import { Directive, HostListener, Input } from '@angular/core';
import { D3Service } from '../services/d3.service'
import { MapService } from '../services/map.service'


@Directive({
  selector: '[appResize]'
})
export class ResizeDirective {

  constructor(private d3Service: D3Service, private mapService: MapService) { }
  @Input() callback: Function;
  @Input() standalones: Standalone[];

  @HostListener('load') resize($event) {
    this.d3Service.readyMap(this.mapService.map, standalones)
  }
}
