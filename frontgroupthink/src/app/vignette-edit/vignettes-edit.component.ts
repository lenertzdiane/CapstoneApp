// import { Component, OnInit, Input } from '@angular/core';
// import { Vignette } from '../models/vignette'
// import { VignetteService } from '../services/vignettes.service';
//
// @Component({
//   selector: 'vignettes-edit',
//   templateUrl: './vignettes-edit.component.html',
// })
//
// export class VignetteEditComponent implements OnInit {
//   @Input() editVignette: Vignette;
//
//   newVignette: Vignette;
//   vignettes: Vignette[];
//   searchCriteria: string
//
//
//   constructor(
//     private vignetteService: VignetteService
//   ) { }
//
//
//
//   ngOnInit() {
//
//     this.vignette = Vignette.CreateDefault();
//     this.newVignette = Vignette.CreateDefault();
//     this.searchCriteria = '';
//     this.getVignettes();
//     // this.editVignette = Vignette.CreateDefault();
//
//   }
//
//   getVignettes(){
//     this.vignetteService.getVignettes(this.searchCriteria)
//     .subscribe(
//       data => {
//         this.vignettes = [];
//         data.forEach(
//           element => {
//             var newVignette = new Vignette(element._id,
//               element.name,
//               element.text,
//               element.characters,
//               element.location,
//               element.order)
//               this.vignettes.push(newVignette);
//             })
//           })
//
//
//   updateVignette(vignette:Vignette) {
//     console.log('in vinedit')
//     console.log(vignette)
//     this.vignetteService
//     .updateVignette(vignette)
//     .subscribe(
//       data => {
//          var index = this.vignettes.findIndex(item => item._id === this.vignette._id);
//          this.vignettes[index] = this.vignette;
//          this.vignette = Vignette.CreateDefault();
//
//          console.log("Added vignette.");
//       }
//     )
//   }
// }
