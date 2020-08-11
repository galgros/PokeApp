import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthGardService} from "../services/auth-guard.service";
import {Router} from "@angular/router";
import {PlayerService} from "../services/player.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authGard: AuthGardService,
    private playerService: PlayerService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: ''
    });
  }

  onSubmit(name) {
    this.authGard.user = name;
    this.playerService.name = name;
    this.authGard.isAuth = true;
    this.router.navigate(['/app-choose-cards']);
  }
}

