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

import { AppRoutingModule } from './/app-routing.module';
import { AuthorComponent } from './author/author.component';
import { HomeComponent } from './home/home.component';
import { ReaderComponent } from './reader/reader.component';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent, VignetteComponent, VignetteDisplayComponent, VignetteEditComponent, AuthorComponent, HomeComponent, ReaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    MatGridListModule
  ],
  providers: [VignetteService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
