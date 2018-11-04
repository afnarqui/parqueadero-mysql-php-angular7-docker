import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommitsComponent } from './commits/commits.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {path: 'commits', component: CommitsComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    CommitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
