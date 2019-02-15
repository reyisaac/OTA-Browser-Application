import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsListComponent } from './flights/flights-list/flights-list.component';
import { FlightsFindComponent } from './flights/flights-find/flights-find.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [{
  path: '', component: FlightsFindComponent,
  }, {
  path: 'flights', component: FlightsListComponent
  // not going to work chekc in code can Activate, this has to be when flight is searched.
  }, {
  path: 'login', component: LoginComponent,
  }, {
  path: 'signup', component: SignupComponent,
  }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
