import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommitsComponent } from './commits/commits.component';
import { Route, RouterModule } from '@angular/router';
import { CeldasComponent } from './celdas/celdas.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'


const routes: Route[] = [
  {path: '', component: CeldasComponent},
  {path: 'celdas', component: CeldasComponent},
  {path: 'commits', component: CommitsComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    CommitsComponent,
    CeldasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),    
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
