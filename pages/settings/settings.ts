import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { HomePage } from '../home/home'
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  city: string;
  state: string;
  lat: number;
  lon: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private geolocation: Geolocation) {

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("lat " + resp.coords.latitude + " " + resp.coords.longitude)
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.lat = data.coords.latitude;
      this.lon = data.coords.longitude;
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });


    this.storage.get('location').then((val) => {
      if (val != null) {
        let location = JSON.parse(val)
        this.city = location.city
        this.state = location.state
      } else {
        this.city = 'Friedrichshafen'
        this.state = 'DE'
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveForm(type) {

     let location = {}

    if (type == 'geo') {
      location = {
        lat: this.lat,
        lon: this.lon,
        type: 1
      }
    }

    else {
      location = {
        city: this.city,
        state: this.state,
        type: 2
      }
    }

    this.storage.set('location', JSON.stringify(location))
    this.navCtrl.push(HomePage)
  }
}
