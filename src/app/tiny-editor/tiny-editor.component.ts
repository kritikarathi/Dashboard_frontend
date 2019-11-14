import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.css']
})
export class TinyEditorComponent implements OnInit {
  data="";
  @Output() open: EventEmitter<any> = new EventEmitter();
  @Input() prefilledValue='';
  
  constructor() { }

  ngOnInit() {
    this.ngOnChanges();
  }

  ngOnChanges(){
    console.log("ON CHANGE",this.prefilledValue)
    if(this.prefilledValue!=''){
      this.data=this.prefilledValue;
     }else{
       this.data=''
     }
  }

  dataChange(){
     this.open.emit(this.data);
  }

}
