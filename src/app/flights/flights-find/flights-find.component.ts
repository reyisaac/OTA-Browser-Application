import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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
    dep = '';
    arr = '';
    dep_date = '';
    arr_date = '';
    class = '';
    trip = 'Round Trip';
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
        this.dep = this.departure_input;
        this.arr = this.arrival_input;
        this.dep_date = this.departure_date_input;
        this.arr_date = this.arrival_date_input;
        this.class = this.class_input;
        this.trip = this.trip_input;

        // for testing purpose
        console.log(this.dep + ' ' + this.arr + ' ' + this.dep_date + ' ' + this.arr_date + ' ' + this.class + ' ' + this.trip);

        if (this.trip === 'Round Trip') {
            // have dep_date and arr_date available
        }
        if (this.trip === 'One Way') {
            // have only dep_date
        }
        if (this.trip === 'Multi Trip') {
            // have multiple flights added bellow with only dep_date
        }

        // make a query next to express
    }
    onChangeTrip() {
        this.trip = this.trip_input;
    }
}
