import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesService } from './places.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public API_KEY = 'cbc1bf19af364d8ab3d180042241701';

  constructor(private http: HttpClient, private placesService: PlacesService) { }
  
  public async getWeather(): Promise<any> {
    try {
      const useLocation = await this.placesService.getPosition();
      
      const response = await this.http.get(`http://api.weatherapi.com/v1/current.json?key=${this.API_KEY}&q=${useLocation.lat},${useLocation.lng}`)
        .toPromise();
      
      console.log(useLocation.lat, useLocation.lng);
      //console.log(response); // Aquí puedes ver el objeto de respuesta en la consola
      return response;
    } catch (error) {
      console.error('Error getting weather data:', error);
      throw error; // También puedes propagar el error para manejarlo en otro lugar si es necesario.
    }
  }
}
