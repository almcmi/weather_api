import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
    apiKey = 'd4d345ff7584dc4c37eb195c664577aa';

  constructor(
    private http: HttpClient
  ) { }

  getLatLonCoord(zip: string, country: string): Observable<any> {
    // url = http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
    return this.http.get('http://api.openweathermap.org/geo/1.0/zip?zip=' + zip + ',' + country + '&appid=' + this.apiKey)
      .pipe(timeout(20000));
  }

  getWeatherData(latitude: string, longitude: string): Observable<any> {
    // lat and lon coordinates: get from separate call
    // url = pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + this.apiKey + '&units=imperial')
      .pipe(timeout(20000));
  }
}
