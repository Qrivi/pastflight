import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private api: string = 'https://cors-anywhere.herokuapp.com/https://www.flightstats.com/v2/flight-tracker';

  constructor(private http: HttpClient) { }

  fetchFlight(id: string, date: Date): Promise<string> {
    let flight = id.match(/([A-Za-z]+)([0-9]+)/);
    let url = `${this.api}/${flight[1]}/${flight[2]}?year=${date.getFullYear()}&month=${date.getMonth() + 1}&date=${date.getDate()}`;

    // console.log('GET ', url);

    return new Promise((resolve, reject) => {
      this.http.get(url, { responseType: 'text' })
        .subscribe(data => {
          let classNames = data.match(/data-styled-components="(.*?)"/)[1].split(' ');
          let classBefore = classNames[29];
          let classAfter = classNames[65];

          let container = data.match(new RegExp(`${classBefore}"\>(.*?)${classAfter}`));

          if (typeof container === 'undefined' || !container)
            reject(`It appears there's no data for ${id} on this day.`);

          let output = container[0].substring(container[0].indexOf('>') + 1, container[0].lastIndexOf('>') - 5)
            .replace(/ class="(.*?)"/gm, '')
            .replace(/ color="(.*?)"/gm, '')
            .replace(/\<img (.*?)\>/gm, '')
            .replace(/\<a (.*?)\>/gm, '')
            .replace(/\<\/a\>/gm, '');

          // console.log(output);
          resolve(output);
        });
    });
  }
}
