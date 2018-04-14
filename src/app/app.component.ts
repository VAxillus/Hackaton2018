import { Component, OnInit } from '@angular/core';
import { PlacesService } from './service/places.service';
//import { default as placesJsonData } from '../assets/data/Naturupplevelser_Karlskrona.json';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import * as $ from "jquery"
//declare var $;


//let places: { id: number, coords: number[]}[];

export interface Places {
  id: number,
  name: string,
  coords: number[],
  description: string
}

export interface BicycleParkingSpot {
 id: number;
 lat: number;
 lng: number;
 name: string;
}

export interface BicyclePumps {
  id: number,
  location: string,
  coords: number[]

}
export interface Waypoint {
 location: {
   lat: number;
   lng: number;
 }
}

export interface DirectionReq {
 origin: {
   lat: number;
   lng: number;
 };
 destination:
 {
   lat: number;
   lng: number;
 };
 travelMode: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit{
  title: string = 'GeedN';
  lat: number;
  lng: number;
  items: any;
  coords: any;
  places: Places[] = new Array();
  bicycleParkingSpots: BicycleParkingSpot[] = new Array();
  bicyclePumps: BicyclePumps[] = new Array();
  directionReq: DirectionReq;
  waypointReqs: Waypoint[] = new Array();

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
  this.http.get('https://opendata.arcgis.com/datasets/c3389d99ac6c4f30adafd3494f56c09a_0.geojson').map(res=>res.json()).subscribe(data => {
  this.items = data;
  //console.log(this.items);
  for(var i = 0; i < this.items.features.length; i++){
    this.coords = this.items.features[i].geometry.coordinates;
    this.lat = this.coords[1];
    this.lng = this.coords[0];
    this.places.push({
      id: i,
      name: this.items.features[i].properties.Name,
      coords: [this.lat, this.lng],
      description: this.items.features[i].properties.Caption
    });
    console.log(this.places[i]);
  }
  });
  this.http.get('https://opendata.arcgis.com/datasets/6ab539c274af433e9d26c7a6e8641823_0.geojson').map(res=>res.json()).subscribe(bicycleParkingData => {

   this.items = bicycleParkingData;
   console.log(this.items);
   for(var i = 0; i < this.items.features.length; i++)
   {
     this.bicycleParkingSpots.push(
       {
         id: i,
         lat: this.items.features[i].geometry.coordinates[1],
         lng: this.items.features[i].geometry.coordinates[0],
         name: this.items.features[i].properties.Plats
       }
     );
   }
   this.directionReq = {
    origin: { lat: this.bicycleParkingSpots[0].lat, lng: this.bicycleParkingSpots[0].lng},
    destination: {lat: this.bicycleParkingSpots[40].lat, lng: this.bicycleParkingSpots[40].lng},
    travelMode: "BICYCLING"
  };
  this.waypointReqs.push({
    location: {
      lat: this.items.features[15].geometry.coordinates[1],
      lng: this.items.features[15].geometry.coordinates[0]
    }
    });
});

this.http.get('https://opendata.arcgis.com/datasets/1c1b09939f2b490fb16f8866c50b9a9f_0.geojson').map(res=>res.json()).subscribe(data => {

 this.items = data;
 for(var i = 0; i < this.items.features.length; i++)
 {
   this.bicyclePumps.push(
     {
       id: i,
       coords: [this.items.features[i].geometry.coordinates[1], this.items.features[i].geometry.coordinates[0]],
       location: this.items.features[i].properties.Plats
     }
   );
    console.log(this.bicyclePumps[i]);
 }
});
}


}
