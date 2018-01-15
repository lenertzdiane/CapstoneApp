import { Component, OnInit } from '@angular/core';
import { VignetteService } from '../services/vignettes.service'
import { Vignette } from '../models/vignette'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  searchCriteria: string;
  vignettes: Vignette[];
  filteredVignettes: Vignette[];

  constructor(private vignetteService: VignetteService) { }

  ngOnInit() {
    this.searchCriteria = '',
    this.vignettes = [],
    this.getVignettes();
    this.filteredVignettes = []

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

  findByCharacter(character) {
    console.log(typeof character)
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
       console.log(this.filteredVignettes)

  }

}
