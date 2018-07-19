import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class AppComponent {
  public d0: Date = new Date();
  public d1: Date = new Date();
  public d2: Date = new Date();

  public flightsD0: Array<string> = [];
  public flightsD1: Array<string> = [];
  public flightsD2: Array<string> = [];

  constructor(private service: FlightService) {
    console.log("Initializing...");
    this.d1.setDate(this.d1.getDate() - 1);
    this.d2.setDate(this.d2.getDate() - 2);

    // flights for today
    ['FR2955'].forEach((flight) => {
      this.parseFlight(service.fetchFlight(flight, this.d1), '0');
    });

    // flights for yesterday
    ['BA165', 'LY316'].forEach((flight) => {
      this.parseFlight(service.fetchFlight(flight, this.d1), '1');
    });

    // flights for the day before yesterday
    ['LY318', 'BA167'].forEach((flight) => {
      this.parseFlight(service.fetchFlight(flight, this.d1), '2');
    });
  }

  parseFlight = (promise, queue) => {
    promise
      .then((flight) => {
        this[`flightsD${queue}`].push(flight);
      })
      .catch((error) => {
        this[`flightsD${queue}`].push(`<div class='error'>${error}</div>`);
      });
  };
}
