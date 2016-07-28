import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GeofenceListPage} from "../geofence-list/geofence-list";

/*
  Generated class for the LoginScreenPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login-screen/login-screen.html',
})
export class LoginScreenPage {
  constructor(private nav: NavController) {}

  onSubmit() {
    this.nav.setRoot(GeofenceListPage);
  }
}
