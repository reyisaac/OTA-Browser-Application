import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FlightFind } from '../flight-find.model';

import * as data from '../../../assets/data/airports.json';

export interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-flights-find',
    templateUrl: './flights-find.component.html',
    styleUrls: ['./flights-find.component.css']
})
export class FlightsFindComponent implements OnInit {
    search_bar = true; // boolean for turning on search bar
    trip = 'Round Trip'; // default to round trip
    departure_input = '';
    arrival_input = '';
    departure_date_input = '';
    arrival_date_input = '';
    class_input = '';
    trip_input = '';

    minDate = new Date();

    myControl = new FormControl();
    options: string[] = [];
    filteredOptions: Observable<string[]>;

    ngOnInit() {
        // looking inside airport.json and finiding airports
        for (const key in data.default.iata) {
            if (data.default.iata.hasOwnProperty(key)) {
                this.options.push(data.default.iata[key]);
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

        return this.options.filter(index => index.toLowerCase().includes(filterValue));
    }

    // button will trigger this function
    onFindFlight() {
        this.search_bar = false;
        const flight: FlightFind = {
            departure: this.departure_input,
            arrival: this.arrival_input,
            dep_date: this.departure_date_input,
            arr_date: this.arrival_date_input,
            class: this.class_input,
            trip: this.trip_input
        };

        // for testing purpose
        console.log(flight.departure + ' ' + flight.arrival + ' ' + flight.dep_date
                + ' ' + flight.arr_date + ' ' + flight.class + ' ' + flight.trip);

        if (flight.trip === 'Round Trip') {
        }
        if (flight.trip === 'One Way') {
        }
    }
    onChangeTrip() {
        this.trip = this.trip_input;
    }
}
