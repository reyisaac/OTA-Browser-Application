import { Component } from '@angular/core';

export interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-flights-find',
    templateUrl: './flights-find.component.html',
    styleUrls: ['./flights-find.component.css']
})
export class FlightsFindComponent {
    dep = '';
    arr = '';
    dep_date = '';
    arr_date = '';
    class = '';
    trip = '';
    departure_input = '';
    arrival_input = '';
    departure_date_input = '';
    arrival_date_input = '';
    class_input = '';
    trip_input = '';

    minDate = new Date();

    // button will trigger this function
    onFindFlight() {
        this.dep = this.departure_input;
        this.arr = this.arrival_input;
        this.dep_date = this.departure_date_input;
        this.arr_date = this.arrival_date_input;
        this.class = this.class_input;
        this.trip = this.trip_input;

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

}