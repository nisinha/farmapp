import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder,  ControlGroup, Validators, AbstractControl} from '@angular/common';
import {CustomValidators} from "../../validators/CustomValidators";
import {DataProvider} from "../../providers/data-provider/data-provider";
import {Json} from "@angular/platform-browser-dynamic/src/facade/lang";
import {GeofenceListPage} from "../geofence-list/geofence-list";
/*
  Generated class for the SigninPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/signin/signin.html',
})
export class SigninPage implements OnInit{


  authForm: ControlGroup;
  username: AbstractControl;
  password: AbstractControl;
  items: any;
  incorrectPassword = false;
  incorrectUserName = false;
  loginSuccessfull = false;
  constructor(private navController: NavController, private formBuilder: FormBuilder, private data: DataProvider) {

  }

  ngOnInit():any {
    this.authForm = this.formBuilder.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(5), CustomValidators.checkFirstCharacterValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6), CustomValidators.checkFirstCharacterValidator])]
    });

    this.username = this.authForm.controls['username'];
    this.password = this.authForm.controls['password'];
  }


  onSubmit(value: string): void {
    if(this.authForm.valid) {
      console.log('Submitted value: ', value);
      this.data.getData().then((todos) => {
        if(todos) {
          console.log(todos);
          this.items = Json.parse(todos);

          if(value['username'] !== this.items['username']) {
            console.log('uname inc');
            this.incorrectUserName = true;
          }
          if(value['password'] !== this.items['password']) {
            this.incorrectPassword = true;
          }
          if(!this.incorrectPassword && !this.incorrectUserName) {
            this.loginSuccessfull = true;
            this.navController.setRoot(GeofenceListPage);
          }
        }
      });
    }
  }

}
