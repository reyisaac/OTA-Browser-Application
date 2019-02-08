import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FlightFind } from './flight-find.model';
import { FlightList } from './flight-list.model';
import { map } from 'rxjs/operators';

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

    this.http
      .get<{message: string, flights: any}>('http://localhost:3000/api/flights', { params })
      .pipe(map((flightData) => {
        return flightData.flights.map(flight => {
          return {
            departure: flight.departure,
            arrival: flight.arrival,
            dep_date: flight.dep_date,
            arr_date: flight.arr_date,
            dep_time: flight.dep_time,
            arr_time: flight.arr_time,
            class: flight.class,
            price: flight.price,
            airline: flight.airline,
            id: flight._id,
          };
        });
      }))
      .subscribe((transformedFlight) => {
        this.flights = transformedFlight;
        this.flightsUpdated.next([...this.flights]);
    });
  }
}
