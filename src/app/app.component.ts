import { Component, ViewChild, ElementRef } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { FlightComponent } from './components/flight/flight.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  private _activeQueue: number = -1;

  public d0: Date = new Date();
  public d1: Date = new Date();
  public d2: Date = new Date();

  public flightsD0: Array<string> = [];
  public flightsD1: Array<string> = [];
  public flightsD2: Array<string> = [];

  public cardsLoading: number = 0;

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
    this[`flightsD${this._activeQueue}`].push(this.flightInput.nativeElement.value);
    this.activeQueue = -1;
    this.cardsLoading++;
  };

  removeFlight = (queue, flight) => {
    flight.disabled = true;
    setTimeout(() => {
      this[`flightsD${queue}`] = this[`flightsD${queue}`].filter((f) => {
        return f.id !== flight.id;
      });
    }, 500);
  };
}

class FlightData {
  constructor(public id: string, public html: string, public disabled?: boolean) { }
}
