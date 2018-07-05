import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private url: string = 'https://cors-anywhere.herokuapp.com/https://www.flightstats.com/v2/flight-tracker';
  private fetchedFlights: Array<string> = [];

  get flights() {
    return this.fetchedFlights;
  }

  constructor(private http: HttpClient) { }

  fetchFlight(id: string, date: Date) {
    let flight = id.match(/([A-Za-z]+)([0-9]+)/);

    this.http.get(`${this.url}/${flight[1]}/${flight[2]}?year=${date.getFullYear()}&month=${date.getMonth() + 1}&date=${date.getDate()}`, { responseType: 'text' })
      .subscribe(data => {
        let classNames = data.match(/data-styled-components="(.*?)"/)[1].split(' ');
        let classBefore = classNames[29];
        let classAfter = classNames[65];

        let container = data.match(new RegExp(`${classBefore}"\>(.*?)${classAfter}`))[0];
        this.fetchedFlights.push(container.substring(container.indexOf('>') + 1, container.lastIndexOf('>') + 1));
      });
  }
}
