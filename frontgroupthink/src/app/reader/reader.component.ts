import { ApplicationRef, Component, OnInit, ViewChild } from '@angular/core';
import { Vignette } from '../models/vignette'
import { VignetteService } from '../services/vignettes.service';
import * as L from "leaflet";
import { MapComponent } from '../map/map.component'


@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})

export class ReaderComponent implements OnInit {
  // @ViewChild('myMap') mapComponent: MapComponent;
  vignettes: Vignette[];
  editVignette: Vignette;
  searchCriteria: string;
  scrollTop: number;
  scrollHandler: Function;
  text: object;

  constructor(
    private vignetteService: VignetteService) {
      this.scrollHandler = this.handleScroll.bind(this);
  }


  ngOnInit() {
    // this.editVignette = Vignette.CreateDefault();
    this.searchCriteria = '';
    this.getVignettes();
  }

  handleScroll(scrollTop, text) {
    this.scrollTop = scrollTop;
    this.text = text;
  }

  getVignettes(){
    this.vignetteService.getVignettes(this.searchCriteria)
    .subscribe(
      data => {
        this.vignettes = [];
        data.forEach(
          element => {
            var newVignette = new Vignette(element._id,
              element.name,
              element.text,
              element.characters,
              element.location)
              this.vignettes.push(newVignette);
            })
          })
        }

      }
