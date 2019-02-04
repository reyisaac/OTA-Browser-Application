import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FlightFind } from '../flight-find.model';
import { FlightListService } from '../flight-list.service';
import {Router} from '@angular/router';

import * as data from '../../../assets/data/airports.json';

@Component({
    selector: 'app-flights-find',
    templateUrl: './flights-find.component.html',
    styleUrls: ['./flights-find.component.css']
})
export class FlightsFindComponent implements OnInit, OnDestroy {
    flight: FlightFind; // default to round trip
    trip_input = 'Round Trip';
    departure_input = '';
    arrival_input = '';
    departure_date_input = '';
    arrival_date_input = '';
    class_input = 'Economy';
    error = false;

    minDate = new Date();

    myControl = new FormControl();
    airports: string[] = [];

    filteredOptions: Observable<string[]>;

    constructor(public flightsService: FlightListService, private router: Router) {}

    ngOnInit() {
        // looking inside airport.json and finding airports
        for (const key in data.default.iata) {
            if (data.default.iata.hasOwnProperty(key)) {
                this.airports.push(data.default.iata[key]);
            }
        }
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
            startWith(''),
            map(value => value.length >= 3 ? this._filter(value) : [])
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.airports.filter(index => index.toLowerCase().includes(filterValue));
    }

    // button will trigger this function
    onFindFlight() {
        // for sending the iata code instead of the airport name
        for (const key in data.default.iata) {
            if (key) {
                switch (data.default.iata[key]) {
                    case this.departure_input:
                        this.departure_input = key;
                        break;
                    case this.arrival_input:
                        this.arrival_input = key;
                        break;
                    default:
                        break;
                }
            }
        }

        // checking input form
        if (this.trip_input === 'Round Trip') {
            if (this.departure_date_input === '' || this.departure_input === '' ||
                this.arrival_date_input === '' || this.arrival_input === '') {
                    this.error = true;
                return;
            }
        } else {
            if (this.departure_date_input === '' || this.departure_input === '' || this.arrival_input === '') {
                this.error = true;
                return;
            }
        }

        this.flight = {
            id: null,
            departure: this.departure_input,
            arrival: this.arrival_input,
            dep_date: this.departure_date_input,
            arr_date: this.arrival_date_input,
            class: this.class_input,
            trip: this.trip_input
        };

        this.router.navigate(['/flights']);
    }

    onChangeTrip() {
        this.trip_input = this.trip_input;
        this.error = false;
    }

    ngOnDestroy() {
        this.flightsService.flight = this.flight;
    }
}
