/**
 * Created by nisinha on 7/28/2016.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/Rx";
import {Json} from "@angular/platform-browser-dynamic/src/facade/lang";
import {FarmLocation} from "../models/farm-location";


@Injectable()
export class DataAccessService {
  constructor(private _http : Http) {}

  getPosts(): Observable<any> {
    return this._http.get('http://localhost:8080/hello-world/test')
      .map(res => res.json());
  }

  addFarm (farmLocation: FarmLocation) : Observable<any> {
    const body = Json.stringify(farmLocation);
    console.log(body);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:8080/farm/add', body, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }


  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || ' error');
  }
}

