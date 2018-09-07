import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlightState } from './models/FlightState';
import { Animations } from './animations/animations';
import { first, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
      Animations.shakeTrigger
  ]
})

// TODO save flights to cookie as well, in addition to get params
// TODO show small colored dot on cards to indicate status

export class AppComponent implements OnInit {
  private _activeQueue = -1;
  public cardsLoading = 0;
  public shakeAnimationState = 'inactive';

  public d0: Date = new Date();
  public d1: Date = new Date();
  public d2: Date = new Date();

  public flightsD0: Array<string> = [];
  public flightsD1: Array<string> = [];
  public flightsD2: Array<string> = [];

  @ViewChild('flightInput') flightInput: ElementRef;

  get activeQueue() {
    return this._activeQueue;
  }

  set activeQueue(activeQueue: number) {
    this._activeQueue = activeQueue;
    this.flightInput.nativeElement.value = '';
    this.flightInput.nativeElement.focus();
  }

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(`Initializing...`);
    this.d1.setDate(this.d1.getDate() - 1);
    this.d2.setDate(this.d2.getDate() - 2);
  }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(debounceTime(500), first())
      .subscribe(data => {
        if (data.params) {
          if (params.d0) {
            params.d0.split(',').forEach((p) => {
              if (p.match(/^\D{1,2}\d{1,4}$/)) {
                this.addFlight(p, 0);
              }
            });
          }
          if (params.d1) {
            params.d1.split(',').forEach((p) => {
              if (p.match(/^\D{1,2}\d{1,4}$/)) {
                this.addFlight(p, 1);
              }
            });
          }
          if (params.d2) {
            params.d2.split(',').forEach((p) => {
              if (p.match(/^\D{1,2}\d{1,4}$/)) {
                this.addFlight(p, 2);
              }
            });
          }
        }else{
          //localstorage
        }
      });
  }

  addFlight = (id?: string, queue?: number): void => {
    const i = id !== undefined ? id : this.flightInput.nativeElement.value.replace(/[^0-9a-z]/g, '');
    const q = queue !== undefined ? queue : this.activeQueue;

    if (!i.length || q === -1 || this[`flightsD${q}`].includes(i.toUpperCase())) {
      this.shakeAnimationState = 'active';
      return;
    }

    this.cardsLoading++;
    this[`flightsD${q}`].push(i.toUpperCase());

    if (queue === undefined) {
      this.activeQueue = -1;
      this.updateRoute();
    }
  }

  removeFlight = (id: string, queue: number) => {
    setTimeout(() => {
      this[`flightsD${queue}`].splice(this[`flightsD${queue}`].indexOf(id), 1);
      this.updateRoute();
    }, 500);
  }

  handleFlightStateChange = (id: string, queue: number, state: FlightState): void => {
    switch (state) {
      case FlightState.Ready:
        this.cardsLoading--;
        console.log(`Card loaded. ${this.cardsLoading} cards still loading.`);
        break;
      case FlightState.Obsolete:
        this.removeFlight(id, queue);
        break;
    }
  }

  updateRoute = () => {
    this.router.navigate([], {
      queryParams: {
        d0: this.flightsD0.join(),
        d1: this.flightsD1.join(),
        d2: this.flightsD2.join()
      },
      relativeTo: this.route
    });
  }
}
