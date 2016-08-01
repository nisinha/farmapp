import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {GeofenceDetailsPage} from "../geofence-details/geofence-details";

/*
  Generated class for the FarmdetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/farmdetails/farmdetails.html',
})
export class FarmdetailsPage {
  private geofence: Geofence;

  constructor(private nav: NavController, private navParam: NavParams) {
      this.geofence = this.navParam.get('geofence');
  }

  edit() {
    this.tranisitionToDetailsPage(this.geofence);
  }

  tranisitionToDetailsPage(geofence) {
    this.nav.push(GeofenceDetailsPage,  {geofence});
  }
}
