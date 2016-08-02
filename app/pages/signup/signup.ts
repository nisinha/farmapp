import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FORM_DIRECTIVES, FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import {CustomValidators} from "../../validators/CustomValidators";
import {Json} from "@angular/platform-browser-dynamic/src/facade/lang";
import {DataProvider} from "../../providers/data-provider/data-provider";
import {HomePage} from "../home/home";
import {GeofenceListPage} from "../geofence-list/geofence-list";
/*
  Generated class for the SignupPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage{

  authForm: ControlGroup;
  username: AbstractControl;
  password: AbstractControl;
  cpassword: AbstractControl;
  notSame= false;
  items: any;
  constructor(private navController: NavController, private fb: FormBuilder, private data: DataProvider) {
    this.authForm = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(6), CustomValidators.checkFirstCharacterValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5), CustomValidators.checkFirstCharacterValidator])],
      'cpassword': ['', Validators.compose([Validators.required, Validators.minLength(5), CustomValidators.checkFirstCharacterValidator])]
    });

    this.username = this.authForm.controls['username'];
    this.password = this.authForm.controls['password'];
    this.cpassword = this.authForm.controls['cpassword'];

  }

  onSubmit(value: string) {
    let password =  value['password'];
    let username =  value['username'];

    if (password != username) {
      this.notSame = true;
      console.log('not same');

    }
      if(this.password.value === this.cpassword.value) {
        console.log('same');
        var detail = {username: username, password: password};
      this.data.save(detail);
      this.navController.setRoot(GeofenceListPage);
    }


  }

}
