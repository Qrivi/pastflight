import { Component, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlightService } from '../../services/flight.service';
import { FlightState } from '../../models/FlightState';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent {
  private _id: string;
  private _date: Date;

  @Output()
  public state: BehaviorSubject<FlightState>;

  public states: any = FlightState;

  public data: any;

  get id(): string {
    return this._id;
  }

  @Input()
  set id(id: string) {
    this._id = id;

    if (this._date && this.state.value === FlightState.Init) {
      this.parseData(this.service.fetchFlight(this._id, this._date));
    }
  }

  get date(): Date {
    return this.date;
  }

  @Input()
  set date(date: Date) {
    this._date = date;

    if (this._id && this.state.value === FlightState.Init) {
      this.parseData(this.service.fetchFlight(this._id, this._date));
    }
  }

  constructor(private service: FlightService) {
    this.state = new BehaviorSubject<FlightState>(FlightState.Init);
  }

  parseData = (promise: Promise<any>): void => {
    this.state.next(FlightState.Loading);
    promise.then((data) => {
      this.data = data;
      this.state.next(FlightState.Ready);
    });
  }
}
