import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }

  fetchUserDetail(user){
    debugger;
    return this.http.post('http://localhost:3000/users/login',user)
  }
}
