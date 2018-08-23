import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlightComponent } from './components/flight/flight.component';
import { AppRoutingModule } from './app-routing.module';

String.prototype.matchAll = function(regexp) {
  const matches = [];
  this.replace(regexp, function() {
    const arr = ([]).slice.call(arguments, 0);
    const extras = arr.splice(-2);
    arr.index = extras[0];
    arr.input = extras[1];
    matches.push(arr);
  });
  return matches.length ? matches : null;
};

@NgModule({
  declarations: [
    AppComponent,
    FlightComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
