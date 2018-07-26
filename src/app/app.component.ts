import { Component, ViewChild, ElementRef } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { FlightState } from './models/FlightState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  private _activeQueue: number = -1;
  public cardsLoading: number = 0;

  public d0: Date = new Date();
  public d1: Date = new Date();
  public d2: Date = new Date();

  public flightsD0: Array<string> = [];
  public flightsD1: Array<string> = [];
  public flightsD2: Array<string> = [];

  @ViewChild("flightInput") flightInput: ElementRef;

  get activeQueue() {
    return this._activeQueue;
  }

  set activeQueue(activeQueue: number) {
    this._activeQueue = activeQueue;
    this.flightInput.nativeElement.value = "";
    this.flightInput.nativeElement.focus();
  }

  constructor() {
    console.log("Initializing...");
    this.d1.setDate(this.d1.getDate() - 1);
    this.d2.setDate(this.d2.getDate() - 2);
  }

  addFlight = () => {
    if (this.activeQueue !== -1) {
      this.cardsLoading++;
      this[`flightsD${this._activeQueue}`].push(this.flightInput.nativeElement.value);
    }
    this.activeQueue = -1;
  };

  // removeFlight = (id: string, queue: number) => {
  //   setTimeout(() => {
  //     this[`flightsD${queue}`].splice(this[`flightsD${queue}`].indexOf(id), 1);
  //     console.log(this[`flightsD${queue}`]);
  //   }, 3000);
  // };

  handleFlightStateChange = (state: FlightState) => {
    switch (state) {
      case FlightState.Ready:
        this.cardsLoading--;
        break;
      case FlightState.Obsolete:
        //this.removeFlight(flight.id, queue);
        break;
    }
  };
}
