import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginserviceService } from './loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error='';
  constructor(private http:HttpClient,private router:Router, private loginService:LoginserviceService) { }

  ngOnInit() {
    localStorage.clear()
  }
keyup(){
  this.error=''
}
  onSubmit(data){
    if(!data.username){
      this.error="Please Enter Username!"
      return;
    }else if(!data.password){
      this.error="Please Enter Password!"   
      return;
    }
    let user ={
      UserName:data.username,
      Password:data.password
   }


       this.loginService.fetchUserDetail(user).subscribe((data)=>{
 
         console.log(data)
        let userDetail={
                token:data['token'],
                name:data['user']['Name'],
                userId:data['user']['_id']
             }
             localStorage.setItem('user',JSON.stringify(userDetail));
             this.router.navigate(['/home'])
       },(err)=>{
          if (err.status == "400") {
            this.error = "Invalid Username or Password"
          }
         })

  }

}
