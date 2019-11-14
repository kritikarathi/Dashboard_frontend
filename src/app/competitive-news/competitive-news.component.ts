import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

declare var $:any;
var expanded = false;
@Component({
  selector: 'app-competitive-news',
  templateUrl: './competitive-news.component.html',
  styleUrls: ['./competitive-news.component.scss']
})
export class CompetitiveNewsComponent implements OnInit {
  @ViewChild('closeUpdateUserModal',{static:false}) closeUpdateUserModal: ElementRef;
  indication:any;
  moa:any;
  product:any;
  company:any;
  news:any;
  user:any;
  prefilled=false;
  prefilledData:any;
  newsSelected:any;
  selectedFields={
    "Moa":'',
    "Product":"",
    "OCompany":"",
    "LCompany":"",
    "Indication":""
  }
  therapySelected:any;
  obj={
    title:'',
    body:'',
    LetterStatus:'',
    source:'',
    moa:'',
    product:"",
    originatedCompany:"",
    licenceeCompany:"",
    indication:"",
    therapy:'',
    CreatedBy:''
  }
  toggle(data){
    console.log("Toggled",data);
    if($('#'+data).hasClass("fa-star-o")){
      $('#'+data).toggleClass('active');
      $('#'+data).removeClass('fa-star-o');
      $('#'+data).addClass('fa-star');
    }else{
      $('#'+data).toggleClass('active');
      $('#'+data).removeClass('fa-star');
      $('#'+data).addClass('fa-star-o');
    }
    // if($('#'+data).hasClass("fa-star-o")){
    //   $('.click').toggleClass('active')
    //   setTimeout(function() {
    //     $('#'+data).removeClass('fa-star-o')
    //     $('#'+data).addClass('fa-star')
    //   }, 15)
    // }else{
    //   $('.click').toggleClass('active')
    //   setTimeout(function() {
    //     $('#'+data).removeClass('fa-star')
    //     $('#'+data).addClass('fa-star-o')
    //   }, 15)
    // }
  }

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.therapySelected = JSON.parse(localStorage.getItem('therapySelected'))
    this.user = JSON.parse(localStorage.getItem('user'))
    //this.news = JSON.parse(localStorage.getItem('news'))
    var data={
      Therapy_id:this.therapySelected._id
    }
    this.http.get('http://localhost:3000/fetchALlNews').subscribe((news)=>{
      this.news = news
      
      console.log("News====>",this.news)
    })
   this.obj.therapy = this.therapySelected._id
   this.obj.CreatedBy = this.user.userId
    this.http.post('http://localhost:3000/fetchIndicationByTherapy',data).subscribe((data)=>{
         this.indication = data

         console.log(this.indication,this.indication[2])
         this.obj.indication = this.indication[this.indication.length-1]._id;
         
    })
    this.http.post('http://localhost:3000/fetchMOAByProduct',data).subscribe((data)=>{
      this.moa = data
      console.log("MOA===>",this.moa)
      this.obj.moa = this.moa[this.moa.length-1]._id;

      })

        this.http.post('http://localhost:3000/fetchProductByIndication',data).subscribe((data)=>{
          this.product = data
          console.log("Product",this.product)
          this.obj.product = this.product[this.product.length-1]._id;
        })

        this.http.post('http://localhost:3000/fetchCompanyByProduct',data).subscribe((data)=>{
          this.company = data
          this.obj.originatedCompany = this.company[this.company.length-1]._id;
          this.obj.licenceeCompany = this.company[this.company.length-1]._id;
        })

        console.log(this.selectedFields)
   
  }

  selected(filter){
    if(filter=="indication"){
        var selectedIndication= this.indication.filter((item) => item.selected)
        console.log(selectedIndication,filter)
         
    }
    if(filter == "moa"){
      var selectedMoa = this.moa.filter((item) => item.selected)
      console.log(selectedMoa,filter)
    }
    if(filter== "product"){
      var selectedProduct = this.product.filter((item) => item.selected)
      console.log(selectedProduct,filter)
    }
    if(filter== "company"){
      var selectedCompany = this.company.filter((item) => item.selected)
      console.log(selectedCompany,filter)
    }
    console.log(filter)
  }

  fetchValue(data,title){
    if(title == "indication"){
      this.obj.indication = data._id;
    } else if(title == "moa"){
      this.obj.moa = data._id;
    }else if(title == "product"){
      this.obj.product = data._id;
    }else if(title == "Ocompany"){
      this.obj.originatedCompany = data._id;
    }else if(title == "Lcompany"){
      this.obj.licenceeCompany = data._id;
    }
    console.log(this.obj)
  }

  heading(data){
    this.newsSelected=data;
  }

  save(newsForm: NgForm,status){
    console.log(newsForm.value,status)
    this.obj.title = newsForm.value.title;
    this.obj.LetterStatus=status;
    this.obj.source = newsForm.value.source;
    console.log(this.obj)
    if(this.prefilled){
           alert('updated')
    }else{
      this.http.post('http://localhost:3000/addNewLetter',this.obj).subscribe((data)=>{
        alert("News Saved")
      })
    }
  
    this.closeUpdateUserModal.nativeElement.click()
  }
  publish(newsForm: NgForm,status){
    this.obj.title = newsForm.value.title;
    this.obj.LetterStatus=status;
    this.obj.source = newsForm.value.source
    console.log(this.closeUpdateUserModal)
    console.log(this.obj)
    this.closeUpdateUserModal.nativeElement.click();
  }
  fetchData(data){
    console.log(data)
    this.obj.body = data
  }

  DoubleClick(){
    $('#newsModal').modal('toggle');
  }

  moveToPublish(){
    
  }

  openInEditMode(data){
    this.prefilled = true;
    this.prefilledData=data;
    console.log(data)
    $('#myModal').modal('toggle');
  }


}
