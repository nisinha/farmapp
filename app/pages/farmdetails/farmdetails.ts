import { Component } from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {GeofenceDetailsPage} from "../geofence-details/geofence-details";
import {Json} from "@angular/platform-browser-dynamic/src/facade/lang";

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
  private farmName: string;
  constructor(private nav: NavController, private navParam: NavParams, private events: Events) {
      this.geofence = this.navParam.get('geofence');

    console.log(Json.stringify(this.geofence));
    this.farmName = this.geofence.notification.text;
    events.subscribe('farm:details', (userEventData) => {
      // userEventData is an array of parameters, so grab our first and only arg
      this.farmName = userEventData[0].notification.text;
    });
  }

  edit() {
    this.tranisitionToDetailsPage(this.geofence);
  }

  tranisitionToDetailsPage(geofence) {
    this.nav.push(GeofenceDetailsPage,  {geofence});
  }
}
