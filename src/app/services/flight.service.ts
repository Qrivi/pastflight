import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private api = 'https://cors-anywhere.herokuapp.com/https://www.flightstats.com/v2/flight-tracker';

  constructor(private http: HttpClient) { }

  public fetchFlight(id: string, date: Date): Promise<any> {
    const flight = id.match(/([A-Za-z]+)([0-9]+)/);

    if (!flight) {
      return new Promise((resolve, reject) => {
        resolve({});
      });
    }

    const url = `${this.api}/${flight[1]}/${flight[2]}?year=${date.getFullYear()}&month=${date.getMonth() + 1}&date=${date.getDate()}`;

    if (isDevMode()) {
      console.log('GET ', url);
    }

    return this.http.get(url, { responseType: 'text' })
      .toPromise()
      .then(data => {
        const json = JSON.parse(data.match(/__NEXT_DATA__ = (.*)/)[1]).props.initialState.flightTracker;

        if (isDevMode()) {
          console.log(json);
        }

        return json;
      })
      .catch((err) => {
        alert(`The service is not responding (${err.message})`);
        throw new Error(err);
      });
  }
}
