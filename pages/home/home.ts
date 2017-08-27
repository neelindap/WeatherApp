import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;
  location: {
    city: string,
    state: string,
    type: number
  }

  constructor(public navCtrl: NavController,
    private weatherProvider: WeatherProvider,
    private storage: Storage) {

  }

  ionViewWillEnter() {
    this.storage.get('location').then((val) => {
      if (val != null) {
        this.location = JSON.parse(val)
      } else {
        this.location = {
          city: 'Friedrichshafen',
          state: 'DE',
          type: 2
        }       
      }

      this.weatherProvider.getWeather(this.location).subscribe(weather => {
        this.weather = weather.current_observation;
      }); 
    })


  }

}
