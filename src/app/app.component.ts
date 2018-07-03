import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightComponent } from './modules/flight/flight.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private title: string = 'app';
  private flights: Array<FlightComponent> = [];

  constructor(http: HttpClient) {
    console.log("Initializing...");

    this.flights.push(new FlightComponent(http, "LY318", new Date()));
  }
}
