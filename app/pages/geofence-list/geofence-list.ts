import { Component } from "@angular/core";
import { NavController, Platform, MenuController } from "ionic-angular";
import { GeofenceDetailsPage } from "../geofence-details/geofence-details";
import { GeofenceService } from "../../services/geofence-service";
import { GeofenceListItem } from "../../components/geofence-list-item/geofence-list-item";
import {FarmdetailsPage} from "../farmdetails/farmdetails";
import {CropGeofence} from "../../models/crop-farm";

@Component({
  templateUrl: "build/pages/geofence-list/geofence-list.html",
  directives: [GeofenceListItem]
})
export class GeofenceListPage {
  isLoading: boolean = false;
  geofences: [CropGeofence];

  constructor(
    private nav: NavController,
    private geofenceService: GeofenceService,
    private platform: Platform,
    private menu: MenuController
  ) {
    this.isLoading = true;
    this.platform.ready().then(() => {
      this.geofenceService.findAll()
        .then(geofences => {
          this.geofences = geofences;
          this.isLoading = false;
        })
        .catch(() => this.isLoading = false);
    });
  }

  ionViewDidEnter() {
    this.menu.enable(true);
  }



  addFarm() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const geofence = this.geofenceService.create({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });

        this.transitionToDetailsPage(geofence);
      },
      (error) => {

      },
      { timeout: 5000 }
    );
  }

  farmTapped(geofence) {
    this.nav.push(FarmdetailsPage, {geofence});
  }

  transitionToDetailsPage(geofence) {
    this.nav.push(GeofenceDetailsPage, {
      geofence
    })
  }
}
