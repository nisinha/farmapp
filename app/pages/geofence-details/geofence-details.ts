import { Component } from "@angular/core";
import {NavController, NavParams, MenuController, Events} from "ionic-angular";
import * as Leaflet from "leaflet";
import { GeofenceService } from "../../services/geofence-service";
import {DataAccessService} from "../../services/dataacess-service";
import {Json} from "@angular/platform-browser-dynamic/src/facade/lang";
import {FarmLocation} from "../../models/farm-location";
import {String} from "es6-shim";
import {CropGeofence} from "../../models/crop-farm";

@Component({
  templateUrl: "build/pages/geofence-details/geofence-details.html"
})
export class GeofenceDetailsPage {
  private geofence: CropGeofence;
  private _radius: number;
  private _latLng: any;
  private notificationText: string;
  private transitionType: string;
  private circle: any;
  private marker: any;
  private map: any;
  private crop: string;
  private response: string;

  constructor(
    private nav: NavController,
    navParams: NavParams,
    private geofenceService: GeofenceService,
    private menu: MenuController,
    private dataService: DataAccessService,
    private events: Events
  ) {
    this.geofenceService = geofenceService;
    this.geofence = navParams.get("geofence");
    console.log(Json.stringify(this.geofence));
    this.transitionType = this.geofence.transitionType.toString();
    this.notificationText = this.geofence.notification.text;
    this._radius = this.geofence.radius;
    this.crop = this.geofence.crop;
    this._latLng = Leaflet.latLng(this.geofence.latitude, this.geofence.longitude);
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    this._radius = value;
    this.circle.setRadius(value);
  }

  set latLng(value) {
    this._latLng = value;
    this.circle.setLatLng(value);
    this.marker.setLatLng(value);
  }

  get latLng() {
    return this._latLng;
  }

  ionViewLoaded() {
    this.menu.enable(false);
    // workaround map is not correctly displayed
    // maybe this should be done in some other event
    setTimeout(this.loadMap.bind(this), 100);
  }

  loadMap() {
    this.map = Leaflet
      .map("map")
      .setView(this.latLng, 13)
      .on("click", this.onMapClicked.bind(this))

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);

    this.marker = Leaflet
      .marker(this.latLng, { draggable: true })
      .on("dragend", this.onMarkerPositionChanged.bind(this))
      .addTo(this.map);

    this.circle = Leaflet.circle(this.latLng, this.radius).addTo(this.map);
  }

  onMapClicked(e) {
    this.latLng = e.latlng;
  }

  onMarkerPositionChanged(e) {
    const latlng = e.target.getLatLng();

    this.latLng = latlng;
  }

  saveChanges() {
    const geofence = this.geofence;

    geofence.notification.text = this.notificationText;
    geofence.radius = this.radius;
    geofence.latitude = this.latLng.lat;
    geofence.longitude = this.latLng.lng;
    geofence.transitionType = parseInt(this.transitionType, 10);
    geofence.crop = this.crop;

    this.events.publish('farm:details', geofence);
    this.dataService.addFarm({customerId: 'nish.cse@gmail.com', farmId: this.geofence['id'], farmName: this.notificationText,latitude: String(geofence.latitude), longitude: String(geofence.longitude), radius: String(geofence.radius), crop: this.crop})
      .subscribe(response => this.response = response,
        error => console.log(error));

    this.geofenceService.addOrUpdate(geofence).then(() => {
      this.nav.pop();
    });
  }
}
