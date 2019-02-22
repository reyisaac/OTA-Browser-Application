import { Component, OnInit } from '@angular/core';
import { FlightListService } from '../flights/flight-list.service';
import { FlightList } from '../flights/flight-list.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  flights: FlightList[] = [];

  constructor(private flightService: FlightListService) { }

  ngOnInit() {
    this.flights = this.flightService.flightsToBook;
  }

}
