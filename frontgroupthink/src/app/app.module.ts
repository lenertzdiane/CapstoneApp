import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { VignetteComponent } from './vignettes/vignettes.component'
import { VignetteDisplayComponent } from './vignette-display/vignettes-display.component'
import { VignetteEditComponent } from './vignette-edit/vignettes-edit.component'

import { VignetteService } from './services/vignettes.service';
import { MapService } from './services/map.service';
import { D3Service } from './services/d3.service';


import { AppRoutingModule } from './/app-routing.module';
import { AuthorComponent } from './author/author.component';
import { HomeComponent } from './home/home.component';
import { ReaderComponent } from './reader/reader.component';
import { MatGridListModule} from '@angular/material/grid-list';
import { NotesComponent } from './notes/notes.component';
import { MenuComponent } from './menu/menu.component';
import { ScrollAnimateDirective } from './directives/scroll-animate.directive';
import { MapComponent } from './map/map.component';
import { ResizeDirective } from './directives/resize.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { ModalDirective } from './directives/modal.directive';
import { PartEditComponent } from './part-edit/part-edit.component';
import { LocationDirective } from './directives/location.directive';



@NgModule({
  declarations: [
    AppComponent, VignetteComponent, VignetteDisplayComponent, VignetteEditComponent, AuthorComponent, HomeComponent, ReaderComponent, NotesComponent, MenuComponent, ScrollAnimateDirective, MapComponent, ResizeDirective, HighlightDirective, PartEditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    MatGridListModule
  ],
  providers: [VignetteService, MapService, D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
