import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

declare var $: any;
var expanded = false;
@Component({
  selector: 'app-competitive-news',
  templateUrl: './competitive-news.component.html',
  styleUrls: ['./competitive-news.component.scss']
})
export class CompetitiveNewsComponent implements OnInit {
  @ViewChild('closeUpdateUserModal', { static: false }) closeUpdateUserModal: ElementRef;
  indication: any;
  moa: any;
  product: any;
  company: any;
  news: any;
  user: any;
  prefilled = false;
  prefilledData: any;
  newsSelected: any;
  allNews: any;
  selectedFields = {
    "Moa": '',
    "Product": "",
    "OCompany": "",
    "LCompany": "",
    "Indication": ""
  }
  therapySelected: any;
  selectedIndication = [];
  selectedDuration=[];
  selectedMoa = [];
  selectedProduct = [];
  selectedCompany = [];
  selectedLetterStatus = [];
  obj = {
    user: '',
    title: '',
    body: '',
    LetterStatus: '',
    source: '',
    moa: '',
    product: "",
    originatedCompany: "",
    licenceeCompany: "",
    indication: "",
    therapy: '',
    CreatedBy: ''
  }
  toggle(data) {
    console.log("Toggled", data);
    if ($('#' + data).hasClass("fa-star-o")) {
      $('#' + data).toggleClass('active');
      $('#' + data).removeClass('fa-star-o');
      $('#' + data).addClass('fa-star');
    } else {
      $('#' + data).toggleClass('active');
      $('#' + data).removeClass('fa-star');
      $('#' + data).addClass('fa-star-o');
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {

    let date: Date = new Date();  
    console.log("Date..", date)

    this.therapySelected = JSON.parse(localStorage.getItem('therapySelected'))
    this.user = JSON.parse(localStorage.getItem('user'))
    var data = {
      Therapy_id: this.therapySelected._id
    }
    this.fetchNews();
    this.obj.therapy = this.therapySelected._id
    this.obj.CreatedBy = this.user.userId
    this.http.post('https://api.vrinda-tea.com/fetchIndicationByTherapy', data).subscribe((data) => {
      this.indication = data
      this.obj.indication = this.indication[this.indication.length - 1]._id;
    })
    this.http.post('https://api.vrinda-tea.com/fetchMOAByProduct', data).subscribe((data) => {
      this.moa = data
      this.obj.moa = this.moa[this.moa.length - 1]._id;

    })

    this.http.post('https://api.vrinda-tea.com/fetchProductByIndication', data).subscribe((data) => {
      this.product = data
      this.obj.product = this.product[this.product.length - 1]._id;
    })

    this.http.post('https://api.vrinda-tea.com/fetchCompanyByProduct', data).subscribe((data) => {
      this.company = data
      this.obj.originatedCompany = this.company[this.company.length - 1]._id;
      this.obj.licenceeCompany = this.company[this.company.length - 1]._id;
    })
  }

  fetchNews() {
    this.http.get('https://api.vrinda-tea.com/fetchALlNews/' + this.therapySelected._id).subscribe((news) => {
      this.news = news
      this.allNews = this.news;
    })
  }


  selected(filter) {
    console.log(filter)
    if (filter == "indication") {
      this.selectedIndication = this.indication.filter((item) => item.selected)
    }
    if (filter == "moa") {
      this.selectedMoa = this.moa.filter((item) => item.selected)
    }
    if (filter == "product") {
      this.selectedProduct = this.product.filter((item) => item.selected)
    }
    if (filter == "company") {
      this.selectedCompany = this.company.filter((item) => item.selected)
    }
    if (filter == "Saved") {
      this.selectedLetterStatus.push('save')
    } else if (filter == "unSaved") {
      var index = this.selectedLetterStatus.indexOf('save');
      if (index > -1) {
        this.selectedLetterStatus.splice(index, 1);
      }

    }
    if (filter == "Published") {
      this.selectedLetterStatus.push('publish')
    } else if (filter == "unPublished") {
      var index = this.selectedLetterStatus.indexOf('publish');
      if (index > -1) {
        this.selectedLetterStatus.splice(index, 1);
      }

    }
    
    if (filter == "Day" || filter == "Month" || filter == "Week" || filter == "Year") {
      this.selectedDuration=[];
      this.selectedDuration.push(filter)
    } else if(filter=="All"){
       this.selectedDuration = [];
    }

    console.log("LetterStatus", this.selectedLetterStatus)
    if ((!this.selectedIndication.length) && (!this.selectedMoa.length) && (!this.selectedProduct.length) && (!this.selectedCompany.length) && (!this.selectedLetterStatus.length) && (!this.selectedDuration.length)) {
      this.fetchNews();
    }
    this.news = this.allNews
    this.filter(this.news, this.selectedIndication, 'indication')
    this.filter(this.news, this.selectedMoa, 'moa')
    this.filter(this.news, this.selectedProduct, 'product')
    this.filter(this.news, this.selectedCompany, 'company')
    this.filter(this.news, this.selectedLetterStatus, 'LetterStatus')
    this.filter(this.news,this.selectedDuration,'updatedAt')
  }


  filter(newsList, list, column) {
    var filteredNews;
    let news = [];
    if (list.length > 0) {
      list.forEach(element => {
        filteredNews = newsList.filter((item) => {
          if (column == 'company') {
            if (item.originatedCompany == element._id || item.licenceeCompany == element._id) {
              return item;
            }
          } if(column == 'updatedAt'){
            var date = new Date();
            var itemMonth = new Date(item.updatedAt);
            let days=Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(itemMonth.getFullYear(), itemMonth.getMonth(), itemMonth.getDate()) ) /(1000 * 60 * 60 * 24));
            if(element=='Day' && days == 1){
                return item;
            }else if(element=='Week' && (days >0 && days<=7)){
              return item;
            }else if(element=='Month' && (days >0 && days<=30)){
              return item;
            }else if(element=='Year' && (days >0 && days<=365)){
              return item;
            }
          }
          if (column == 'LetterStatus') {
            if (item[column] == element) {
              return item;
            }
          } else {
            if (item[column] == element._id) {
              return item;
            }

          }
      
        });
     debugger;
        if (filteredNews.length > 0) {
          news.push(...filteredNews)
        }
      });
      this.news = news;
      this.news = [...new Set(this.news)]
    }
    this.newsSelected = '';
  }

  fetchValue(data, title) {
    if (title == "indication") {
      this.obj.indication = data._id;
    } else if (title == "moa") {
      this.obj.moa = data._id;
    } else if (title == "product") {
      this.obj.product = data._id;
    } else if (title == "Ocompany") {
      this.obj.originatedCompany = data._id;
    } else if (title == "Lcompany") {
      this.obj.licenceeCompany = data._id;
    }
  }

  heading(data) {
    this.newsSelected = data;
  }

  save(newsForm: NgForm, status) {
    this.obj.user = this.user.userId;
    this.obj.title = newsForm.value.title;
    this.obj.LetterStatus = status;
    this.obj.source = newsForm.value.source;
    if (this.prefilled) {
      if (this.obj.title == '') {
        this.obj.title = this.newsSelected.title;
      }
      if (this.obj.source == '') {
        this.obj.source = this.newsSelected.source;
      }
      if (this.obj.body == '') {
        this.obj.body = this.newsSelected.body;
      }
      this.http.put('https://api.vrinda-tea.com/updateNews/' + this.newsSelected._id, this.obj).subscribe((data) => {
        alert("News updated")
        this.fetchNews();
      })
    } else {
      this.http.post('https://api.vrinda-tea.com/addNewLetter', this.obj).subscribe((data) => {
        alert("News Saved")
        this.fetchNews();
      })
    }

    this.closeUpdateUserModal.nativeElement.click();

  }

  fetchData(data) {
    this.obj.body = data
  }

  DoubleClick() {
    $('#newsModal').modal('toggle');
  }


  //delete news
  delete(data) {
    let obj = {
      user: this.user.userId
    }
    this.http.post('https://api.vrinda-tea.com/deleteNews/' + data._id, obj).subscribe((data) => {
      alert("News Deleted")
      this.fetchNews();
    })
  }

  openInEditMode(data) {
    this.prefilled = true;
    this.prefilledData = data;
    this.obj.indication = data.indication;
    this.obj.moa = data.moa;
    this.obj.product = data.product;
    this.obj.originatedCompany = data.originatedCompany;
    this.obj.licenceeCompany = data.licenceeCompany;
    $('#myModal').modal('toggle');
  }


}
