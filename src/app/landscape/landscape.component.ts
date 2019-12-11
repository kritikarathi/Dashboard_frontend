import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';


@Component({
  selector: 'app-landscape',
  templateUrl: './landscape.component.html',
  styleUrls: ['./landscape.component.scss']
})
export class LandscapeComponent implements OnInit {
  therapySelected:any;
  user:any;
   indication:any;
   indicationSelected:any;
   indicationSelectedId:any;
    landscapeData:any;
    stage=[
      {
        "stage": 'Pre-clinical',
       ' level':0
      },
      {
        "stage": 'Phase I',
       ' level':1
      },
      {
        "stage": 'Phase IA',
       ' level':2
      },
      {
        "stage": 'Phase IB',
       ' level':3
      },
      {
        "stage": 'Phase I/II',
        ' level':4
      },
      {
        "stage": 'Phase IIA',
        ' level':5
      },
      {
        "stage": 'Phase IIB',
        ' level':6
      },
      {
        "stage": 'Phase III',
        ' level':7
      },
      {
        "stage": 'Phase IIIA',
        ' level':8
      },
      {
        "stage": 'Phase IIIB',
        ' level':9
      },
      {
        "stage": 'Phase II/III',
        ' level':10
      },
      {
        "stage": 'Pre-Registration',
        ' level':11
      },
      {
        "stage": 'Marketed',
        ' level':12
      },
      {
        "stage": 'Phase IV',
        ' level':13
      }
    ]
 developmentStage = [];  
    constructor(private http: HttpClient ) {


   }

  ngOnInit() {

    this.therapySelected = JSON.parse(localStorage.getItem('therapySelected'))
    this.user = JSON.parse(localStorage.getItem('user'))
    var data = {
      Therapy_id: this.therapySelected._id
    }

    this.http.post('https://api.vrinda-tea.com/fetchIndicationByTherapy', data).subscribe((data) => {
      this.indication = data
      this.indicationSelected =  this.indication[0]._id
      this.filterByPhase();
      console.log('indication',this.indication)
    })

  }

  filterByPhase(){
    this.http.get('https://api.vrinda-tea.com/fetchAllLandscapeDataByPhase/' + this.indicationSelected).subscribe((data) => {
      console.log('data',data)
      this.landscapeData = data;
      this.developmentStage=[];
      this.landscapeData.forEach(element => {
        this.developmentStage.push(element.developmentStage)
       
      });
      this.developmentStage = [...new Set(this.developmentStage)]
      console.log(this.developmentStage)

let  array1=[];
this.stage.forEach((data)=>{
  this.developmentStage.filter((stage)=>{
    if(data.stage == stage){
      array1.push(data)
    }
  })
})
console.log(array1)
var sortedArray = array1.sort(function(a,b){
  return a.level >b.level?1:a.level <b.level?-1:0
 })
 console.log(sortedArray);

 this.developmentStage = sortedArray;
 console.log( this.developmentStage)
    })

  }



  selectedIndication(indication){
    this.indicationSelected = indication;
    this.filterByPhase();
  }
 

}
