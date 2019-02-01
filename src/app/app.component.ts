import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { latLng, tileLayer, icon, marker, Map, Icon, IconOptions } from 'leaflet';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  map2:Map;
  constructor(private httpClient: HttpClient){}
  title = 'KIG weather APP!';


  res:Array<Object>;
  
  icon: Icon<IconOptions>
    
  customicon = icon({
    iconSize: [ 25, 25 ],
    iconAnchor: [ 13, 41 ],
    iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
});

  $products  = [];
  coordinates = {
    latNum : 42.36,
    lonNum : -71.06
  }
 

  setlat(n1) {
    this.coordinates.latNum = n1;
  }
  setlon(n2) {
    this.coordinates.lonNum = n2;
  }
  getlati(){
    return this.coordinates.latNum;
  }
  getlongi(){
    return this.coordinates.lonNum;
  }

  panflag = 0;
  incity = "Boston";
  getAPIcall () {
      var apiURI = "http://api.openweathermap.org/data/2.5/weather?q="+this.incity+"&APPID={{YOUR_API_KEY}}";
      this.httpClient.get(apiURI).subscribe((res : any[])=>{
        console.log(res);
        this.$products = res;
        var objectinfo=this.$products['coord'];
        this.setlon(objectinfo['lon']);
        this.setlat(objectinfo['lat']);
        marker(latLng([ this.getlati() , this.getlongi()])).addTo(this.map2).setIcon(this.customicon);
        
    });
    
 
      
    }
    
      
    onSubmit(){
      this.panflag = 1;
      this.getAPIcall ();
      this.panMap(this.map2);
      
    }

    
    pin = marker([ this.coordinates.latNum ,this.coordinates.lonNum ], {
      icon: icon({
        iconSize: [ 25, 25 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
      })
    });
    
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    , this.pin],
    zoom: 10,
    center: latLng([ this.getlati() , this.getlongi()])
  };

  panMap(map: Map){
    
    
    if(this.panflag <= 2){
    this.map2.flyTo([this.getlati(),this.getlongi()],7);
    }

    if(this.panflag === 4){
      this.map2.zoomIn(3);
    }
    console.log(this.panflag);
    if(this.panflag < 5)
    setTimeout(()=>{this.panMap(map); this.panflag++;}, 3000);
  }

  onMapReady(map: Map) {
    this.map2 = map;
  }
  
  ngOnInit(){
    this.setlat(42.36);
    this.setlon(-71.06);
  }
  
}  

