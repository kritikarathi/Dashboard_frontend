import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   userDetail:any;
   name:any;
  constructor() { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem('user'))
  
  }


}
