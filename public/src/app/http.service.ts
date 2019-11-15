import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
    constructor(private _http: HttpClient){
      this.getCakes();
    }

    getCakes(){
      return this._http.get('/cakes');
    }
    createCake(cake){
    console.log("service create method", cake)
    return this._http.post('/cakes', cake);
  }

  getOneCake(cake_id){
    console.log("getting one cake")
    return this._http.get('/cakes/' + cake_id);
  }

  editOneCake(cake){
    console.log('in service______________/cakes/' + cake._id, cake)
    return this._http.put('/cakes/' + cake._id, cake);
  }
}