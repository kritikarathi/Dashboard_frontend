import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.css']
})
export class TinyEditorComponent implements OnInit {
  data="";
  @Output() open: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  dataChange(){
     this.open.emit(this.data);
  }

}
