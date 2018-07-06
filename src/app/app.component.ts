import { Component } from '@angular/core';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public flights: Array<string> = [];

  constructor(private service: FlightService) {
    console.log("Initializing...");

    let date = new Date();
    date.setDate(date.getDate() - 1);

    // service.fetchFlight("LY318", date)
    //   .then((flight) => {
    //     this.flights.push(flight);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}
