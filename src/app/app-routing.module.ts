import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsListComponent } from './flights/flights-list/flights-list.component';
import { FlightsFindComponent } from './flights/flights-find/flights-find.component';

const routes: Routes = [{
  path: '', component: FlightsFindComponent,
  }, {
  path: 'flights', component: FlightsListComponent,
  },
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
