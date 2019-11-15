import { HttpService } from './http.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rate My Cakes';
  cakeToRateId = "";
  rating = {
    stars: 0,
    comment:""
  };
  newCake = {
      name: "",
      baker: "",
      imageUrl: ""
    }
  cakes;
  selectedCake=false; 

  constructor(private _httpService: HttpService){}
  ngOnInit(){
    let observable = this._httpService.getCakes()
    observable.subscribe(data => {
      console.log(data)
      this.cakes = data;
    });
  }

  onSubmit(){
    console.log("cake in component: ", this.newCake)
    let observable = this._httpService.createCake(this.newCake)
    observable.subscribe(data => {
      this.newCake = {
        name: "",
        baker: "",
        imageUrl: ""
      }
    })
  }

  selectCakeToRate(cake_id){
    this.cakeToRateId = cake_id;
  }


  rateCake(cake){
    cake.ratings.push(this.rating);
    let observable = this._httpService.editOneCake(cake)
    observable.subscribe(data => {
      this.rating = {
        stars: 0,
        comment:""
      };
    })
  }

  cakeToShow(cake){
  
    this.selectedCake = cake;
    
  }
}
