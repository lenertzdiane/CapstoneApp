import { Component, OnInit, Input } from '@angular/core';
import { Vignette } from '../models/vignette'
import { VignetteService } from '../services/vignettes.service';

@Component({
  selector: 'vignettes-edit',
  templateUrl: './vignettes-edit.component.html',
})

export class VignetteEditComponent implements OnInit {
  @Input() editVignette: Vignette;

  // editVignette: Vignette
  newVignette: Vignette;
  vignettes: Vignette[]


  constructor(
    private vignetteService: VignetteService
  ) { }



  ngOnInit() {
    this.editVignette = Vignette.CreateDefault();
    this.vignettes = []
    this.getVignettes()

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

    updateVignette(vignette:Vignette) {
      console.log(this.editVignette)
      this.vignetteService
      .updateVignette(this.newVignette)
      .subscribe(
        data => {
          var index = this.vignettes.findIndex(item => item._id === this.editVignette._id);
          this.vignettes[index] = this.editVignette;
          this.editVignette = Vignette.CreateDefault();

          console.log("Updated vignette.");
        }
      )
    }
}
