import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css', ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  userisAunthenticated = false;
  first_name = '';
  last_name = '';

  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userisAunthenticated = this.authService.getIsAuth();

    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userisAunthenticated = isAuthenticated;
      this.first_name = this.authService.first_name;
      this.last_name = this.authService.last_name;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
