import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { Vignette } from '../models/vignette'
import { VignetteService } from '../services/vignettes.service';
import { DragulaService } from 'ng2-dragula'


@Component({
  selector: 'vignettes-display',
  templateUrl: './vignettes-display.component.html',
})

export class VignetteDisplayComponent implements OnInit {

  vignettes: Vignette[];
  editVignette: Vignette;
  searchCriteria: string;
  newVignette: Vignette;
  vignetteList: any = []
  updatedVignette: any = [];
  bag: any;
  one: any;


  constructor(private vignetteService: VignetteService, private dragulaService: DragulaService) {

    let currentVignette = this.vignetteList;
      // dragulaService.setOptions();

     dragulaService.drag.subscribe((value: any) => {
     let currentVignette = this.vignetteList; //onchage event ---> pushing data through
   });

   dragulaService.drop.subscribe((value: any[]) => { //runs when item being dragged is dropped into new location
     let currentVignette = this.vignetteList; // --> pushing the data through
     const [bagName, e, el] = value;
     console.log(value)
     this.onDrop(value.slice(1)); //  --> passing to onDrop
   });


 }

 private onDrop(args: any) {
      let [el, target, source] = args;
      const rowData = Array.from(target.children);
      this.updatedVignette = rowData.map((row: any, index: number) => {
        return {
          id: row.dataset.id,
          name: row.dataset.name,
          text: row.dataset.text,
          characters: row.dataset.characters,
          location: row.dataset.location,
          index
        }
      });
      return new Promise((resolve: any, reject: any) => {
        this.handleSaveRequest();
      });
    }

    handleSaveRequest() {
      for(let vignette of this.updatedVignette){
        let newVignette = new Vignette(vignette.id, vignette.name, vignette.text, vignette.characters, vignette.location, (vignette.index + 1));
        this.updateVignetteOrder(newVignette)
      }
  }



  ngOnInit() {
    this.newVignette = Vignette.CreateDefault();
    this.editVignette = Vignette.CreateDefault();
    this.searchCriteria = '';
    this.getVignettes();
  }

  deleteVignette(vignette:Vignette) {
    this.vignetteService
    .deleteVignette(vignette)
    .subscribe(
      data => {
        this.vignettes.splice(this.vignettes.indexOf(vignette), 1);
        console.log("Vignette deleted!");
      })
    }

    setEditVignette(vignette: Vignette){
      console.log(this.vignettes)

      this.editVignette = new Vignette(vignette._id, vignette.name, vignette.text, vignette.characters, vignette.location, vignette.order);
    }


    updateVignetteOrder(vignette:Vignette) {
      this.vignetteService
      .updateVignette(vignette)
      .subscribe(
        data => {
          var index = this.vignettes.findIndex(item => item._id === vignette._id);
          this.vignettes[index] = vignette;
          console.log("updated Vignette.");
        }
      )
    }


    updateVignette(vignette:Vignette) {
      console.log(this.editVignette)
      this.vignetteService
      .updateVignette(this.editVignette)
      .subscribe(
        data => {
          var index = this.vignettes.findIndex(item => item._id === this.editVignette._id);
          this.vignettes[index] = this.editVignette;
          this.editVignette = Vignette.CreateDefault();

          console.log("updated Vignette.");
        }
      )
    }

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
          //create new this.sorted vignettes, iterate over this.vignettes and push in sorted order, then ngFor
          //to display them.

        }
