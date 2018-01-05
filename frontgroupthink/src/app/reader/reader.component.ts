import { Component, OnInit } from '@angular/core';
import { Vignette } from '../models/vignette'
import { VignetteService } from '../services/vignettes.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  vignettes: Vignette[];
  editVignette: Vignette;
  searchCriteria: string;


  constructor(
    private vignetteService: VignetteService
  ) { }



  ngOnInit() {
    // this.editVignette = Vignette.CreateDefault();
    this.searchCriteria = '';
    this.getVignettes();
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
