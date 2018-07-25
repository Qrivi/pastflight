import { Component, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { FlightService } from '../../services/flight.service';
import { FlightData } from '../../models/FlightData';

enum FlightState {
  Init, Loading, Ready
}

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})

export class FlightComponent {
  private _id: string;
  private _date: Date;
  public uuid: string;
  public state: FlightState;

  public states: any = FlightState;

  public data: FlightData;

  get id(): string {
    return this._id;;
  }

  @Input()
  set id(id: string) {
    this._id = id.replace(/[^0-9a-z]/gi, '').toUpperCase();

    if (this._date && this.state === FlightState.Init)
      this.parseData(this.service.fetchFlight(this._id, this._date));
  }

  get date(): Date {
    return this.date;;
  }

  @Input()
  set date(date: Date) {
    this._date = date;

    if (this._id && this.state === FlightState.Init)
      this.parseData(this.service.fetchFlight(this._id, this._date));
  }

  constructor(private service: FlightService) {
    this.uuid = UUID.UUID();
    this.state = FlightState.Init;
  }

  parseData = (promise: Promise<FlightData>) => {
    this.state = FlightState.Loading;
    promise.then((data) => {
      this.data = data;
      this.state = FlightState.Ready;
    });
  };
}
