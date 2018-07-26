import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FlightState } from './models/FlightState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private _activeQueue: number = -1;
  public cardsLoading: number = 0;

  private subscription: Subscription;

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

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(`Initializing...`);
    this.d1.setDate(this.d1.getDate() - 1);
    this.d2.setDate(this.d2.getDate() - 2);
  }

  ngOnInit(): void {
    this.subscription = this.route.queryParams
      .subscribe(params => {
        console.log('parsing request params')
        if (params.d0)
          params.d0.split(',').forEach((p) => {
            if (p.match(/^\D{1,2}\d{1,4}$/))
              this.addFlight(p, 0);
          });
        if (params.d1)
          params.d1.split(',').forEach((p) => {
            if (p.match(/^\D{1,2}\d{1,4}$/))
              this.addFlight(p, 1);
          });
        if (params.d2)
          params.d2.split(',').forEach((p) => {
            if (p.match(/^\D{1,2}\d{1,4}$/))
              this.addFlight(p, 2);
          });
      });
  }

  addFlight = (id?: string, queue?: number): void => {
    let i = id !== undefined ? id : this.flightInput.nativeElement.value;
    let q = queue !== undefined ? queue : this.activeQueue;

    if (q === -1)
      return;

    this.cardsLoading++;
    this[`flightsD${q}`].push(i);

    if (queue === undefined) {
      this.activeQueue = -1;
      this.subscription.unsubscribe();
      this.router.navigate([], {
        queryParams: {
          d0: this.flightsD0.join().toUpperCase(),
          d1: this.flightsD1.join().toUpperCase(),
          d2: this.flightsD2.join().toUpperCase()
        },
        relativeTo: this.route
      });
    }
  };

  // removeFlight = (id: string, queue: number) => {
  //   setTimeout(() => {
  //     this[`flightsD${queue}`].splice(this[`flightsD${queue}`].indexOf(id), 1);
  //     console.log(this[`flightsD${queue}`]);
  //    // + remove from queryparams
  //   }, 3000);
  // };

  handleFlightStateChange = (state: FlightState): void => {
    switch (state) {
      case FlightState.Ready:
        this.cardsLoading--;
        console.log(`Card loaded. ${this.cardsLoading} cards still loading.`);
        break;
      case FlightState.Obsolete:
        //this.removeFlight(flight.id, queue);
        break;
    }
  };
}
