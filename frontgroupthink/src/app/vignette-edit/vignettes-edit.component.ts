import { Component, OnInit, Input } from '@angular/core';
import { Vignette } from '../models/vignette'
import { VignetteService } from '../services/vignettes.service';

@Component({
  selector: 'vignettes-edit',
  templateUrl: './vignettes-edit.component.html',
})

export class VignetteEditComponent implements OnInit {
  @Input() vignette: Vignette;

  editVignette: Vignette
  newVignette: Vignette;
  vignettes: Vignette[]


  constructor(
    private vignetteService: VignetteService
  ) { }



  ngOnInit() {
    this.vignette = Vignette.CreateDefault();
    this.editVignette = Vignette.CreateDefault();
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

          console.log("edited vignette.");
        }
      )
    }
}
