import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { FlightService } from '../../services/flight.service';
import { FlightData } from '../../models/FlightData';

enum FlightState {
  Init, Loading, Ready, Obsolete
}
interface RemoveRequest {
  queue: number;
  flight: string;
}

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent {
  private _id: string;
  private _date: Date;
  private _state: FlightState;
  public uuid: string;

  public states: any = FlightState;

  public data: FlightData;

  @Output()
  public requestRemove: EventEmitter<RemoveRequest> = new EventEmitter<RemoveRequest>();

  get id(): string {
    return this._id;;
  }

  @Input()
  set id(id: string) {
    this._id = id.replace(/[^0-9a-z]/gi, '').toUpperCase();

    if (this._date && this._state === FlightState.Init)
      this.parseData(this.service.fetchFlight(this._id, this._date));
  }

  get date(): Date {
    return this.date;;
  }

  @Input()
  set date(date: Date) {
    this._date = date;

    if (this._id && this._state === FlightState.Init)
      this.parseData(this.service.fetchFlight(this._id, this._date));
  }

  get state(): FlightState {
    return this._state;
  }

  set state(state: FlightState) {
    this._state = state;
  }

  constructor(private service: FlightService) {
    this.uuid = UUID.UUID();
    this.state = FlightState.Init;
  }

  requestRemoveFlight = (queue: number, flight: string) => { };

  parseData = (promise: Promise<FlightData>) => {
    this.state = FlightState.Loading;
    promise.then((data) => {
      this.data = data;
      this.state = FlightState.Ready;
    });
  };
}
