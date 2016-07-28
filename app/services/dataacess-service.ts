/**
 * Created by nisinha on 7/28/2016.
 */

import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import "rxjs/Rx";
import {Json} from "@angular/platform-browser-dynamic/src/facade/lang";


@Injectable()
export class HttpService {
  constructor(private _http : Http) {}

  getPosts(): Observable<any> {
    return this._http.get('http://localhost:8080/hello-world/test')
      .map(res => res.json());
  }

  addFarm (geofence: Geofence) : Observable<any> {
    const body = Json.stringify(geofence);
    console.log(body);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:8080/farm/add', body, {headers: headers})
      .map(res => res.json());
  }
}

