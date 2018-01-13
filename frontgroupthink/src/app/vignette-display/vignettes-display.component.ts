import { Component, OnInit, Input } from '@angular/core';
import { Vignette } from '../models/vignette'
import { VignetteService } from '../services/vignettes.service';


@Component({
  selector: 'vignettes-display',
  templateUrl: './vignettes-display.component.html',
})

export class VignetteDisplayComponent implements OnInit {

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

  deleteVignette(vignette:Vignette) {
    console.log(vignette)
    console.log(vignette._id)

    this.vignetteService
    .deleteVignette(vignette)
    .subscribe(
      data => {
        this.vignettes.splice(this.vignettes.indexOf(vignette), 1);
        console.log("Vignette deleted!");
      })
    }

    setEditVignette(vignette: Vignette){
      this.editVignette = new Vignette(vignette._id, vignette.name, vignette.text, vignette.characters, vignette.location);
    }

    // updateVignette(vignette:Vignette) {
    //   this.vignetteService
    //   .updateVignette(this.newVignette)
    //   .subscribe(
    //     data => {
    //       var index = this.vignettes.findIndex(item => item._id === this.editVignette._id);
    //       this.vignettes[index] = this.editVignette;
    //       this.editVignette = Vignette.CreateDefault();
    //
    //       console.log("Added vignette.");
    //     }
    //   )
    // }

    // setEditVignette(vignette: Vignette){
    //   console.log('in set edit')
    //   this.editVignette = new Vignette(vignette._id, vignette.name, vignette.text, vignette.characters, vignette.location);
    // }

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
