import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';

import { FlightList } from '../flight-list.model';
import { FlightListService } from '../flight-list.service';
import { FlightFind } from '../flight-find.model';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit, OnDestroy {
    flight: FlightFind;
    flights: FlightList[] = [];
    private flightsSub: Subscription;

    constructor(public flightsService: FlightListService) {}

    ngOnInit() {
      this.flightsService.searchFlight();
      this.flightsSub = this.flightsService.getFlightUpdateListener()
        .subscribe((flights: FlightList[]) => {
          this.flights = flights;
        });
    }

    ngOnDestroy() {
      this.flightsSub.unsubscribe();
    }
}
