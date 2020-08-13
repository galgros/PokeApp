import { Component } from '@angular/core';
import {AuthGardService} from "./services/auth-guard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokeApp';
  darkMode = false;

  constructor(
    private authService: AuthGardService,
    private router: Router
    ) {

  }

  onDarkMode() {
    if (this.darkMode === false) {
      this.darkMode = true;
    } else {
      this.darkMode = false;
    }
    return this.darkMode;
  }

  isDarkMode(element: string) {
    switch (element) {
      case 'nav':
        if (this.darkMode === true) {
          return 'navbar-dark bg-dark';
        }
        return 'navbar-light bg-light';
      case 'main' :
        if (this.darkMode === true) {
          return 'darkmode';
        }
        return 'lightmode';
    }
  }

  getUser() {
    return this.authService.user;
  }

  getAuth() {
    return this.authService.isAuth;
  }

  onLogout() {
    this.authService.isAuth = false;
    this.authService.user= "";
    this.router.navigate(['/app-index']);
  }
}
