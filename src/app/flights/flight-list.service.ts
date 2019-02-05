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

  public flight: FlightFind;

  getFlightUpdateListener() {
    return this.flightsUpdated.asObservable();
  }

  searchFlight(flightsPerPage: number, currentPage: number) {
    const  params = new  HttpParams().set('id', null).set('departure', this.flight.departure).set('arrival', this.flight.arrival).
    set('dep_date', this.flight.dep_date).set('arr_date', this.flight.arr_date).set('class', this.flight.class).
    set('trip', this.flight.trip).set('pageSize', String(flightsPerPage)).set('currentPage', String(currentPage));

    this.http.get<{message: string, flights: FlightList[]}>('http://localhost:3000/api/flights', { params })
      .subscribe((flightData) => {
        this.flights = flightData.flights;
        this.flightsUpdated.next([...this.flights]);
    });
  }
}
