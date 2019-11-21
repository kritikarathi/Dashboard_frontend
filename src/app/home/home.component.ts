import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('videoPlayer',{static:false}) videoplayer: ElementRef;
   userDetail:any;
  constructor() { }

  ngOnInit() {
    this.userDetail = JSON.parse(localStorage.getItem('user'))
  }

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
}

}
