import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FlightService } from './flight.service';
import { v4 as uuid } from 'uuid';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  encapsulation: ViewEncapsulation.Native
} )

export class AppComponent {
  public d0: Date = new Date();
  public d1: Date = new Date();
  public d2: Date = new Date();

  public flightsD0: Array < Flight > = [];
  public flightsD1: Array < Flight > = [];
  public flightsD2: Array < Flight > = [];

  public cardsLoading: number = 0;

  constructor( private service: FlightService ) {
    console.log( "Initializing..." );
    this.d1.setDate( this.d1.getDate() - 1 );
    this.d2.setDate( this.d2.getDate() - 2 );

    // flights for today
    [ 'FR2955', 'KD123' ].forEach( ( flight ) => {
      this.parseFlight( 0, service.fetchFlight( flight, this.d1 ) );
    } );

    // flights for yesterday
    [ 'BA165', 'LY316' ].forEach( ( flight ) => {
      this.parseFlight( 1, service.fetchFlight( flight, this.d1 ) );
    } );

    // flights for the day before yesterday
    [ 'LY318', 'BA167' ].forEach( ( flight ) => {
      this.parseFlight( 2, service.fetchFlight( flight, this.d1 ) );
    } );
  }

  parseFlight = ( queue, promise ) => {
    promise
      .then( ( flight ) => {
        this[ `flightsD${queue}` ].push(
          new Flight( uuid(), flight )
        );
      } )
      .catch( ( error ) => {
        this[ `flightsD${queue}` ].push(
          new Flight( uuid(), `<div class='error'><div>Whoops...</div>${error}</div>` )
        );
      } )
      .finally( () => {
        this.cardsLoading--;
      } );
    this.cardsLoading++;
  };

  removeFlight = ( queue, flight ) => {
    flight.disabled = true;
    setTimeout( () => {
        this[ `flightsD${queue}` ] = this[ `flightsD${queue}` ].filter( ( f ) => {
          return f.id !== flight.id;
        } );
    }, 500 );
  };
}

class Flight {
  constructor( public id: number, public html: string, public disabled?: boolean ) {}
}
