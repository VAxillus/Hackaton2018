import { Component, OnInit } from '@angular/core';
import { PlacesService } from './service/places.service';
import { default as placesJsonData } from '../assets/data/Naturupplevelser_Karlskrona.json';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit{
  title: string = 'GeedN';
  lat: number = 56.16156;
  lng: number = 15.58661;
  arr:any[];
  items:any;
  min:any;
  constructor(private http:Http) {
    this.getData();
  }

 ngOnInit() {
   // this.arr = (<any>placesJsonData.features);
   //this.arr = JSON.parse(placesJsonData);
  // console.log(angular.fromjson(placesJsonData));
  //this.places = this.PlacesService.getPlaces();
    // this.PlacesService.getJSON().subscribe(data => {
    //   console.log(data)

  //  });
  }

  getData(){
  this.http.get('https://opendata.arcgis.com/datasets/6ab539c274af433e9d26c7a6e8641823_0.geojson').map(res=>res.json()).subscribe(data => {
  this.items = data;
  console.log(this.items);
  for(var i = 0; i < this.items.features.length; i++){
    this.min = this.items.features[i].geometry;
    console.log(this.min);
  }
  });
}
}
