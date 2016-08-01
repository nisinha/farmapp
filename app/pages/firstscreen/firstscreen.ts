import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import {SignupPage} from "../signup/signup";
import {DataProvider} from "../../providers/data-provider/data-provider";
import {Json} from "@angular/platform-browser-dynamic/src/facade/lang";
import {HomePage} from "../home/home";
import {GeofenceListPage} from "../geofence-list/geofence-list";

/*
  Generated class for the FirstscreenPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/firstscreen/firstscreen.html',
})
export class FirstscreenPage implements OnInit{


  private items: any;
  constructor(private nav: NavController, private data: DataProvider) {

  }

  ngOnInit() {
    this.data.getData().then((todos) => {
      if(todos) {
        console.log('login allowed for list page');
        this.nav.setRoot(GeofenceListPage);
        console.log('setting root to geofece');
      }
    });
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
  onSignin() {
    this.nav.push(SigninPage);
  }
}
