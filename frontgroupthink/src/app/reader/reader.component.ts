import { ApplicationRef, Component, OnInit, ViewChild } from '@angular/core';
import { Vignette } from '../models/vignette'
import { VignetteService } from '../services/vignettes.service';
import { StandaloneService } from '../services/standalone.service';
import { Standalone } from '../models/standalone'

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
  actingVignette: Vignette;
  show: Boolean;
  standalones: Standalone[]

  constructor(
    private vignetteService: VignetteService, private standaloneService: StandaloneService) {
      this.scrollHandler = this.handleScroll.bind(this);
    }


    ngOnInit() {
      // this.editVignette = Vignette.CreateDefault();
      this.searchCriteria = '';
      this.getVignettes();
      this.show = true;
      this.getStandalones();
    }

    // defineVignette(vignette:Vignette) {
    //   this.vignette = vignette
    //   console.log(this.vignette)
    // }

    handleScroll(scrollTop, text, standalones) {
      this.scrollTop = scrollTop;
      this.text = text;
      this.standalones = standalones;
    }


    hide() {
      this.show = !this.show
    }

    setActingVignette(vignette: Vignette) {
      this.actingVignette = new Vignette(vignette._id, vignette.name, vignette.text, vignette.characters, vignette.location);
    }

    getStandalones(){
      this.standaloneService.getStandalones(this.searchCriteria)
      .subscribe(
        data => {
          this.standalones = [];
          data.forEach(
            element => {
              var newStandalone = new Standalone(element._id,
                element.name,
                element.text,
                element.characters,
                element.location)
                this.standalones.push(newStandalone);
              })
            })
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
