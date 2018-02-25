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
  standalones: Standalone[];
  vignette: Vignette;


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

    changeStyling(e) {
      console.log(e)
      console.log('HERE')
    }

    handleScroll(scrollTop, text, vignette) {
      this.scrollTop = scrollTop;
      // this.actingVignette =
      this.text = text;
      // this.standalones = standalones;
      this.setActingVignette(vignette)
    }


    hide() {
      this.show = !this.show
    }

    setActingVignette(vignette: Vignette) {
      let title = vignette[0].childNodes[1].innerText
      // console.log(this.vignettes)
      let interest = this.vignettes.find(x => x.name == title);
      // let workingVignette = Vignettes.where(name = workVignette )
      // console.log(this.actingVignette)
      this.actingVignette = new Vignette(interest._id, interest.name, interest.text, interest.characters, interest.location, interest.order);
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
                element.location,
                element.order)
                this.vignettes.push(newVignette);
              })
            })
          }

        }
