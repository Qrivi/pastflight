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

  public fetchFlight(id: string, date: Date): Promise<FlightData> {
    let flight = id.match(/([A-Za-z]+)([0-9]+)/);
    let url = `${this.api}/${flight[1]}/${flight[2]}?year=${date.getFullYear()}&month=${date.getMonth() + 1}&date=${date.getDate()}`;

    if (isDevMode())
      console.log('GET ', url);

    return new Promise<FlightData>((resolve, reject) => {
      this.http.get(url, { responseType: 'text' })
        .subscribe(data => {
          let classNames = data.match(/data-styled-components="(.*?)"/)[1].split(' ');

          let classBefore = classNames[29];
          let classAfter = classNames[65];

          let flightData = new FlightData();
          let container = data.match(new RegExp(`${classBefore}"\>(.*?)${classAfter}`));

          if (container == null) {
            flightData.flightNumber = `${flight[1]} ${flight[2]}`;
            flightData.company = `Unknown Airline`;
            flightData.status = `No flight data`;
            flightData.error = `It appears there\'s no data for this flight on this day. Either does this flight not exist on this day, or something went wrong fetching its data.`;
          } else {
            let html = container[0].replace(/<a[^>]*>/gm, '');

            if (isDevMode())
              console.log(html);

            flightData.flightNumber = this.getInnerValue(html, classNames[34], 0);
            flightData.company = this.getInnerValue(html, classNames[35], 0);
            flightData.status = this.getInnerValue(html, classNames[37], 0);
            flightData.statusDetail = this.getInnerValue(html, classNames[38], 0);

            flightData.fromAirport = this.getInnerValue(html, classNames[57], 0);
            flightData.fromAddress = this.getInnerValue(html, classNames[39], 0);
            flightData.fromName = this.getInnerValue(html, classNames[40], 0);

            flightData.fromDate = this.getInnerValue(html, classNames[42], 0);
            flightData.fromScheduleTitleA = this.getInnerValue(html, classNames[43], 0);
            flightData.fromScheduleTitleB = this.getInnerValue(html, classNames[43], 1);
            flightData.fromScheduleTimeA = this.getInnerValue(html, classNames[44], 0);
            flightData.fromScheduleZoneA = this.getInnerValue(html, classNames[59], 0);
            flightData.fromScheduleTimeB = this.getInnerValue(html, classNames[44], 1);
            flightData.fromScheduleZoneB = this.getInnerValue(html, classNames[59], 1);

            flightData.toAirport = this.getInnerValue(html, classNames[57], 1);
            flightData.toAddress = this.getInnerValue(html, classNames[39], 1);
            flightData.toName = this.getInnerValue(html, classNames[40], 1);

            flightData.toDate = this.getInnerValue(html, classNames[42], 1);
            flightData.toScheduleTitleA = this.getInnerValue(html, classNames[43], 2);
            flightData.toScheduleTitleB = this.getInnerValue(html, classNames[43], 3);
            flightData.toScheduleTimeA = this.getInnerValue(html, classNames[44], 4);
            flightData.toScheduleZoneA = this.getInnerValue(html, classNames[59], 2);
            flightData.toScheduleTimeB = this.getInnerValue(html, classNames[44], 5);
            flightData.toScheduleZoneB = this.getInnerValue(html, classNames[59], 3);
          }

          if (isDevMode())
            console.log(flightData);

          resolve(flightData);
        });
    });
  };

  private getInnerValue(source: string, className: string, whichMatch: number): string {
    let output = source.matchAll(new RegExp(`${className}[^>]+>([^<]+)`, 'g'));

    if (isDevMode()) {
      console.log(`Getting value ${whichMatch} of '${className}'`);
      console.log(output);
    }

    if (!output || !output[whichMatch])
      return `💩`;
    return output[whichMatch][1];
  };
}
