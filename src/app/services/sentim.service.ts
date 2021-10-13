import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SentimService {
  url = "https://sentim-api.herokuapp.com/api/v1/";
  constructor(public _sentimService : HttpClient) { }

  validateComment(comment:string){
    return this._sentimService.post(this.url,{"text":comment},{headers:{"Accept":"application/json","Content-Type":"application/json"}});
  }
}
