import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private http:HttpClient) { }

  fetchUserDetail(user){
    return this.http.post('https://api.vrinda-tea.com/users/login',user)
  }
}
