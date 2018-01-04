import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { VignetteComponent } from './vignettes/vignettes.component'
import { VignetteDisplayComponent } from './vignette-display/vignettes-display.component'
import { VignetteEditComponent } from './vignette-edit/vignettes-edit.component'

import { VignetteService } from './services/vignettes.service';

@NgModule({
  declarations: [
    AppComponent, VignetteComponent, VignetteDisplayComponent, VignetteEditComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [VignetteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
