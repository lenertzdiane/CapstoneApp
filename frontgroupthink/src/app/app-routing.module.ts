import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VignetteComponent } from './vignettes/vignettes.component'
import { VignetteDisplayComponent } from './vignette-display/vignettes-display.component'
import { AuthorComponent } from './author/author.component'
import { HomeComponent } from './home/home.component'
import { ReaderComponent } from './reader/reader.component'
import { NotesComponent } from './notes/notes.component'
import { StandaloneComponent } from './standalone/standalone.component'


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'reader', component: ReaderComponent },
  { path: 'add', component: VignetteComponent },
  { path: 'manage', component: VignetteDisplayComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'standalone', component: StandaloneComponent }
];

//The method is called forRoot() because you configure the router at the application's
//root level. The forRoot() method supplies the service providers and directives needed
//for routing, and performs the initial navigation based on the current browser URL.
@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
