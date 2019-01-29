import { FlightList } from './flight-list.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FlightFind } from './flight-find.model';

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

  searchFlight(flight: FlightFind) {

    const  params = new  HttpParams().set('id', null).set('departure', flight.departure).set('arrival', flight.arrival).
          set('dep_date', flight.dep_date).set('arr_date', flight.arr_date).set('class', flight.class).set('trip', flight.trip);

    this.http.get<{message: string, flights: FlightList[]}>('http://localhost:3000/api/flights', { params })
      .subscribe((flightData) => {
        this.flights = flightData.flights;
        this.flightsUpdated.next([...this.flights]);
    });
  }
}
