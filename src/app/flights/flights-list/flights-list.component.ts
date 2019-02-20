import { Component } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';

import { FlightList } from '../flight-list.model';
import { FlightListService } from '../flight-list.service';
import { FlightFind } from '../flight-find.model';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css'],
})
export class FlightsListComponent implements OnInit, OnDestroy {

    flight: FlightFind;
    isLoading = false;
    totalFlights = 0;
    flightsPerPage = 20;
    currentPage = 1;
    pageSizeOptions = [20, 50, 100];
    flights: FlightList[] = [];
    private flightsSub: Subscription;

    constructor(public flightsService: FlightListService) {}

    ngOnInit() {
      this.flightsService.searchFlight(this.flightsPerPage, this.currentPage);
      this.isLoading = true;
      this.flightsSub = this.flightsService.getFlightUpdateListener()
        .subscribe((flightData: {flights: FlightList[], flightCount: number}) => {
          this.isLoading = false;
          this.flights = flightData.flights;
          this.totalFlights = flightData.flightCount;
        });
    }

    ngOnDestroy() {
      this.flightsSub.unsubscribe();
    }

    onChangedPage(pageData: PageEvent) {
      this.isLoading = true;
      this.currentPage = pageData.pageIndex + 1;
      this.flightsPerPage = pageData.pageSize;
      this.flightsService.searchFlight(this.flightsPerPage, this.currentPage);
    }
}
