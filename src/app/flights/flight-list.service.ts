import { FlightList } from './flight-list.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class FlightListService {
  private flights: FlightList[] = [];
  private flightsUpdated = new Subject<FlightList[]>();

  constructor(private http: HttpClient) {}

  getFlights() {
    this.http.get<{message: string, flights: FlightList[]}>('http://localhost:3000/api/flights')
        .subscribe((flightData) => {
            this.flights = flightData.flights;
            this.flightsUpdated.next([...this.flights]);
        });
  }

  getFlightUpdateListener() {
    return this.flightsUpdated.asObservable();
  }

  addFlight(airline_name: string, time: string, route: string, price: string) {
    const flight: FlightList = {id: null, airline_name: airline_name, time: time, route: route, price: price};
    this.flights.push(flight);
  }
}
