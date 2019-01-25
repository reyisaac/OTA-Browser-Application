import { Component } from '@angular/core';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent {
    // hardcoded data, than get frlights from express
    flights = [
        {
            airline_name: 'Lufthansa',
            time: '7:35 PM - 5:20 PM',
            route: 'MIA-HKG',
            price: '$2,153'
        },
        {
            airline_name: 'American',
            time: '8:35 PM - 5:20 PM',
            route: 'MIA-HKG',
            price: '$1,553'
        },
        {
            airline_name: 'Austrian',
            time: '10:00 PM - 5:20 PM',
            route: 'MIA-HKG',
            price: '$1,253'
        }
    ];
}