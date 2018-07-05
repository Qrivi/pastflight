import { Component } from '@angular/core';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title: string = 'app';
  public flights: Array<string> = [];

  constructor(private service: FlightService) {
    console.log("Initializing...");
    this.flights = service.flights;

    service.fetchFlight("LY318", new Date());
  }
}
