import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RoutingService } from 'src/app/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Please keep all variables alphabatized and with their type!

  weatherForm = new FormGroup({
    // validation to add:
    // required, numbers and letters only
    zipCode: new FormControl(''),
    // validation: two letters only
    country: new FormControl('')
  });

  country = '';
  jsonResponse = '';
  latitude = '';
  longitude = '';
  zipCode = '';

  unselectedCheckbox = Array();
  stringWeatherResults : string[] = [];
  weatherResults = Array();

constructor(
  private api: RoutingService
) { }

  deleteCity() {
    // remove the unchecked cities from weatherResults[], and thus from displaying on the page
    this.unselectedCheckbox = [];
    // Using a temporary list to resolve typing difficulies when pushing to other arrays
    let tempList = (<HTMLInputElement[]><any>document.getElementsByName('cityCheckboxes'));

    // Add all unchecked entries from tempList to unselectedCheckbox
    for (let i = 0; i < tempList.length; i++) {
          if (!tempList[i].checked) {
            this.unselectedCheckbox.push(tempList[i]);
          }
    }

    // Loop through unselectedCheckbox and weatherResults to compare unique key values
    // If they match, delete from the weatherResults array
    this.unselectedCheckbox.forEach((value, key) => {
      for (let k = 0; k < this.weatherResults.length; k++) {
        if (this.unselectedCheckbox[key].value == this.weatherResults[k].id) {
          this.weatherResults.splice(k, 1);
        }
      }
    });
  }

  submit() {
    // TO-DO: need to add validation to require both of these
    this.zipCode = this.weatherForm.get('zipCode')?.value;
    this.country = this.weatherForm.get('country')?.value;

    // call geocoding api for lat/lon coordinates
    this.api.getLatLonCoord(this.zipCode, this.country)
      .subscribe(response => {
        this.latitude = response.lat;
        this.longitude = response.lon;

        this.callWeatherData(this.latitude, this.longitude);
      },
      // error handling here
      );
  }

    // call main weather api with lat and lon
    callWeatherData(latitude: string, longitude: string) {
      this.api.getWeatherData(latitude, longitude)
        .subscribe(response => {
            this.weatherResults.push({
              id: Date.now(),
              name: response.name,
              weatherNum: response.main,
              weatherDescrip: response.weather[0]
            })
      },
      // error handling here
      );
    }
}
