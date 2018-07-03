import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  private url: string = 'https://cors-anywhere.herokuapp.com/https://www.flightstats.com/v2/flight-tracker';

  constructor(http: HttpClient, id: string, date: Date) {
    let flight = id.match(/([A-Za-z]+)([0-9]+)/);

    http.get(`${this.url}/${flight[1]}/${flight[2]}?year=${date.getFullYear()}&month=${date.getMonth() + 1}&date=${date.getDate()}`, { responseType: 'text/html' })
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
  }
}
