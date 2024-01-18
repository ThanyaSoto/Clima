import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  public weatherData: any;
  public error: string | null = null;
  latitude: any;
  longitude: any;

  constructor(private apiService: ApiService, private placesService: PlacesService) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.getLocation();
      this.weatherData = await this.apiService.getWeather();
      console.log(this.weatherData);
    } catch (error) {
      console.error('Error:', error);
      this.error = 'Error getting weather data';
    }
  }

  formatDate(): string {
    const date = new Date(this.weatherData.location.localtime);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  }

  async getLocation(): Promise<void> {
    const pos = await this.placesService.getPosition();
    this.latitude = pos.lat;
    this.longitude = pos.lng;
  }
}
