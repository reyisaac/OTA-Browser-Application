import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';

import { FlightList } from '../flight-list.model';
import { FlightListService } from '../flight-list.service';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit, OnDestroy {
    flights: FlightList[] = [];
    private flightsSub: Subscription;

    constructor(public flightsService: FlightListService) {}

    ngOnInit() {
      this.flightsService.getFlights();
      this.flightsSub = this.flightsService.getFlightUpdateListener()
        .subscribe((flights: FlightList[]) => {
          this.flights = flights;
        });
    }

    ngOnDestroy() {
      this.flightsSub.unsubscribe();
    }
}
