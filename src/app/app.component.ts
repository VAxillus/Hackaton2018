import { Component, OnInit } from '@angular/core';
import { PlacesService } from './service/places.service';
import { default as placesJsonData } from '../assets/data/Naturupplevelser_Karlskrona.json';
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
  items:any[];
  constructor() {

  }

 ngOnInit() {
   this.getData();
   // this.arr = (<any>placesJsonData.features);
   //this.arr = JSON.parse(placesJsonData);
  // console.log(angular.fromjson(placesJsonData));
  //this.places = this.PlacesService.getPlaces();
    // this.PlacesService.getJSON().subscribe(data => {
    //   console.log(data)

  //  });
  }

  getData(){
   placesJsonData.map(res=>res.json()).subscribe(data => {
   this.items = data;
   console.log(this.items);
   for(var i = 0; i < this.items.length; i++){
     console.log(this.items[i]);
   }
 });
 }
}
