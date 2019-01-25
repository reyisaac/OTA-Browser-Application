import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlightsFindComponent } from './flights/flights-find/flights-find.component';
import { FlightsListComponent } from './flights/flights-list/flights-list.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule,
    MatButtonModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatExpansionModule
} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    FlightsFindComponent,
    NavbarComponent,
    FlightsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
