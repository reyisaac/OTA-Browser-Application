import { Component } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';

import { FlightList } from '../flight-list.model';
import { FlightListService } from '../flight-list.service';
import { FlightFind } from '../flight-find.model';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css'],
  animations: [
    trigger('changeDivSize', [
        state('initial', style({
          transform: 'translateY(-100%)',
        })),
        state('normal', style({
            transform: 'translateY(0%)'
        })),
        state('final', style({
            transform: 'translateY(100%)'
        })),
        transition('initial=>normal', animate('1000ms')),
        transition('normal=>final', animate('1000ms'))
      ]),
]
})
export class FlightsListComponent implements OnInit, OnDestroy {
    currentState = '';
    flight: FlightFind;
    isLoading = false;
    totalFlights = 10;
    flightsPerPage = 10;
    currentPage = 1;
    pageSizeOptions = [10, 20, 50];
    flights: FlightList[] = [];
    private flightsSub: Subscription;

    constructor(public flightsService: FlightListService) {}

    ngOnInit() {
      this.currentState = 'initial';
      this.flightsService.searchFlight(this.flightsPerPage, this.currentPage);
      this.isLoading = true;
      setTimeout(() => this.currentState = 'normal', 200);
      this.flightsSub = this.flightsService.getFlightUpdateListener()
        .subscribe((flights: FlightList[]) => {
          this.isLoading = false;
          this.flights = flights;
          this.totalFlights = flights.length;
        });
    }

    ngOnDestroy() {
      this.flightsSub.unsubscribe();
    }

    // todo: pagination from the back-end
    onChangedPage(pageData: PageEvent) {
      this.isLoading = true;
      this.currentPage = pageData.pageIndex + 1;
      this.flightsPerPage = pageData.pageSize;
      this.flightsService.searchFlight(this.flightsPerPage, this.currentPage);
    }
}
