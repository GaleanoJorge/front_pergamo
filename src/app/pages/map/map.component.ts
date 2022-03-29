import { Component, Input, AfterViewInit } from '@angular/core';
import { validationLatitudeLongitude } from "validation-latitude-longitude";
declare var leaflet;
import * as L from 'leaflet';

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() data: any[];
  public mapId = "map" + Math.floor(Math.random() * 10000) + 1;

  constructor() { }

  ngAfterViewInit(): void {
    var map = L.map(this.mapId).setView([4.6097102, -74.081749], 6);
    var polygon;
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

    // if (municipio != null && latitud == null && longitud == null) {
    //   console.log("Not implemented");
    //   polygon = L.geoJson(departamentos, {
    //     filter: function (feature, layer) {
    //       return (feature.properties.name == municipio);
    //     }
    //   }).addTo(map);
    //   map.fitBounds(polygon.getBounds());
    // }
    if (this.data.length > 0) {
      if (validationLatitudeLongitude.latLong(this.data[0].latitude, this.data[0].longitude))
        map.setView([this.data[0].latitude, this.data[0].longitude], 10);
      this.data.forEach(element => {
        if (validationLatitudeLongitude.latLong(element.latitude, element.longitude))
          polygon = L.marker([element.latitude, element.longitude]).bindPopup(element.label).addTo(map);
      });
    }
  }

}
