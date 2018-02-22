import { Component, OnInit } from '@angular/core';
import { VignetteService } from '../services/vignettes.service'
import { StandaloneService } from '../services/standalone.service'
import { Vignette } from '../models/vignette'
import { Standalone } from '../models/standalone'


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  standalone: Standalone;
  standalones: Standalone[];
  searchCriteria: string;
  vignettes: Vignette[];
  filteredVignettes: Array<object>;
  filteredCharacters: Array<string>;
  filteredStandaloneCharacters: Array<string>;


  constructor(private vignetteService: VignetteService, private standaloneService: StandaloneService) { }

  ngOnInit() {
    this.searchCriteria = '',
    this.vignettes = [],
    this.getVignettes();
    this.getStandalones();
    this.filteredVignettes = [];
    this.filteredCharacters = [];
    this.filteredStandaloneCharacters = [];
    this.standalones = []
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


              assembleCharacters() {
                this.vignettes.forEach( (vignette) =>  {
                  vignette.characters.forEach( (char)  =>{
                    console.log(char)
                    console.log(typeof char)

                    if(!(this.filteredCharacters.includes(char))) {
                      this.filteredCharacters.push(char)
                      console.log(char)
                    }
                  });
                });
              }

              assembleStandaloneCharacters() {
                this.standalones.forEach( (standalone) =>  {
                  standalone.characters.forEach( (char)  =>{
                    if(!(this.filteredCharacters.includes(char))) {
                      this.filteredCharacters.push(char)
                    }
                  });
                });
              }

              assembleStandalonCharacters() {
                this.vignettes.forEach( (vignette) =>  {
                  vignette.characters.forEach( (char)  =>{
                    if(!(this.filteredCharacters.includes(char))) {
                      this.filteredCharacters.push(char)
                    }
                  });
                });
              }

              findStandaloneByCharacter(character){
                this.standaloneService.getStandalones(character)
                .subscribe(
                  data => {
                    data.forEach(
                      element => {
                        var newStandalone = new Standalone(element._id,
                          element.name,
                          element.text,
                          element.characters,
                          element.location)
                          this.filteredVignettes.push(newStandalone);
                        })
                      })
                    }


                    findByCharacter(character) {
                      this.vignetteService.getVignettes(character)
                      .subscribe(
                        data => {
                          this.filteredVignettes = [];
                          data.forEach(
                            element => {
                              var newVignette = new Vignette(element._id,
                                element.name,
                                element.text,
                                element.characters,
                                element.location,
                                element.order);
                                this.filteredVignettes.push(newVignette);
                              })
                            })


                          }



                        }
