import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  data:any;
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {

      this.http.get('http://localhost:3000/fetchALlTherapies').subscribe((data)=>{
        console.log(data)
        this.data=data;
      })


      this.http.get('http://localhost:3000/fetchALlProducts').subscribe((data)=>{
        console.log(data)
     
      })
      

  }

  therapySelected(data){
    console.log(data)
    localStorage.setItem('therapySelected',JSON.stringify(data))
    this.router.navigate(['/news'])
  }

}
