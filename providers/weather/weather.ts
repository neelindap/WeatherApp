import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WeatherProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WeatherProvider {

  apiKey = "9708bf638567b37b"
  url;

  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    this.url = 'http://api.wunderground.com/api/' + this.apiKey + '/conditions/q'
  }

  getWeather(location) {
    if (location.type == 1) {
      return this.http.get(this.url + '/' + location.lat + ',' + location.lon + '.json')
        .map(res => res.json())
    } else {
      return this.http.get(this.url + '/' + location.state + '/' + location.city + '.json')
        .map(res => res.json())
    }
  }

}
