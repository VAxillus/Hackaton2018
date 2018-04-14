import { Component, OnInit } from '@angular/core';
import { PlacesService } from './service/places.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit{
  title: string = 'My first AGM project';
  lat: number = 56.16156;
  lng: number = 15.58661;
  constructor(private PlacesService:PlacesService ) {

  }

  ngOnInit() {
  //this.places = this.PlacesService.getPlaces();
    this.PlacesService.getJSON().subscribe(data => {
      console.log(data)

    });
  }
}
