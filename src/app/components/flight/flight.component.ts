import { Component, Input, OnInit } from '@angular/core';
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

export class FlightComponent implements OnInit {
  private _id: string;
  private _date: Date;
  public uuid: string;
  public state: FlightState;

  public data: FlightData;

  get id(): string {
    return this._id;;
  }

  @Input()
  set id(id: string) {
    this._id = id.trim().toUpperCase();

    if (this._date && this.state === FlightState.Init)
      this.service.fetchFlight(this._id, this._date);
  }

  get date(): Date {
    return this.date;;
  }

  @Input()
  set date(date: Date) {
    this._date = date;

    if (this._id && this.state === FlightState.Init)
      this.service.fetchFlight(this._id, this._date);
  }

  constructor(private service: FlightService) {
    this.uuid = UUID.UUID();
    this.state = FlightState.Init;
  }

  ngOnInit() {
  }
}
