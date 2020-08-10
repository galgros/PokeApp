import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  title = this.appComponent.title;

  constructor(private appComponent: AppComponent) {
  }

  ngOnInit() {
  }

}
