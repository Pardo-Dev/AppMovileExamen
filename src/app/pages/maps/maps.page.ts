import { Component, OnInit } from '@angular/core';
declare var google: any ;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  //2. variables locales para controlar el mapa:
  map: any;
  marker: any;
  marker2: any;
  marker3: any;
  
  constructor() {}

  async ngOnInit(){
    await this.cargarMapa();
    this.autocompletarInput(this.map, this.marker);
  }

  //3. métodos que trabajen el mapa:
  async cargarMapa(){
    const mapa: any = document.getElementById("map");
    this.map = new google.maps.Map(mapa,{
      center: {lat: -33.59851240585664,lng: -70.57894131022714},
      zoom: 18
    });

    this.marker = new google.maps.Marker({
      position: {lat: -33.59851240585664,lng: -70.57894131022714},
      map: this.map,
      title: 'Ubicación inicial'
    });

    this.marker2 = new google.maps.Marker({
      position: {lat: -33.516202865739835,lng: -70.60001005370869},
      map: this.map,
      title: 'Ubicación inicial'
    });
    this.marker3 = new google.maps.Marker({
      position: {lat: -33.66782653863494,lng: -70.58556640454246},
      map: this.map,
      title: 'Ubicación inicial'
    });

  }
  async autocompletarInput(mapaLocal:any, marcadorLocal: any){
    var autocomplete: any = document.getElementById("autocomplete");
    const search = new google.maps.places.Autocomplete(autocomplete);
    search.bindTo('bounds', this.map);
  }
}