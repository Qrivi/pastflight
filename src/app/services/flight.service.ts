import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightData } from '../models/FlightData';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private api: string = 'https://cors-anywhere.herokuapp.com/https://www.flightstats.com/v2/flight-tracker';

  constructor(private http: HttpClient) { }

  public fetchFlight(id: string, date: Date): Promise<string> {
    let flight = id.match(/([A-Za-z]+)([0-9]+)/);
    let url = `${this.api}/${flight[1]}/${flight[2]}?year=${date.getFullYear()}&month=${date.getMonth() + 1}&date=${date.getDate()}`;

    if (isDevMode())
      console.log('GET ', url);

    return new Promise((resolve, reject) => {
      this.http.get(url, { responseType: 'text' })
        .subscribe(data => {
          let classNames = data.match(/data-styled-components="(.*?)"/)[1].split(' ');

          let classBefore = classNames[29];
          let classAfter = classNames[65];

          let flightData = new FlightData();
          let container = data.match(new RegExp(`${classBefore}"\>(.*?)${classAfter}`));

          if (container == null)
            return reject(`It appears there's no data for ${id} on this day.`);
          //beter ook data aanmaken

          let html = container[0].replace(/<a[^>]*>/gm, '');

          flightData.flightNumber = this.getInnerValue(html, classNames[34], 1);
          flightData.company = this.getInnerValue(html, classNames[35], 1);
          flightData.status = this.getInnerValue(html, classNames[37], 1);
          flightData.statusDetail = this.getInnerValue(html, classNames[38], 1);

          flightData.fromAirport = this.getInnerValue(html, classNames[57], 1);
          flightData.fromAddress = this.getInnerValue(html, classNames[39], 1);
          flightData.fromName = this.getInnerValue(html, classNames[40], 1);

          flightData.fromDate = this.getInnerValue(html, classNames[42], 1);
          flightData.fromScheduleTitleA = this.getInnerValue(html, classNames[43], 1);
          flightData.fromScheduleTitleB = this.getInnerValue(html, classNames[43], 2);
          flightData.fromScheduleTimeA = this.getInnerValue(html, classNames[44], 1);
          flightData.fromScheduleZoneA = this.getInnerValue(html, classNames[59], 1);
          flightData.fromScheduleTimeB = this.getInnerValue(html, classNames[44], 2);
          flightData.fromScheduleZoneB = this.getInnerValue(html, classNames[59], 2);

          flightData.toAirport = this.getInnerValue(html, classNames[57], 2);
          flightData.toAddress = this.getInnerValue(html, classNames[39], 2);
          flightData.toName = this.getInnerValue(html, classNames[40], 2);

          flightData.toDate = this.getInnerValue(html, classNames[42], 2);
          flightData.toScheduleTitleA = this.getInnerValue(html, classNames[43], 3);
          flightData.toScheduleTitleB = this.getInnerValue(html, classNames[43], 4);
          flightData.toScheduleTimeA = this.getInnerValue(html, classNames[44], 5);
          flightData.toScheduleZoneA = this.getInnerValue(html, classNames[59], 3);
          flightData.toScheduleTimeB = this.getInnerValue(html, classNames[44], 6);
          flightData.toScheduleZoneB = this.getInnerValue(html, classNames[59], 4);

          if (isDevMode())
            console.log(flightData);

          return resolve('flightData');
        });
    });
  }

  private getInnerValue(source: string, className: string, whichMatch: number): string {
    let output = source.match(new RegExp(`${className}[^>]+>([^<]+)`));
    return output[whichMatch];
  }
}
