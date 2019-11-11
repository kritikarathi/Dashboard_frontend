import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
//import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'; 
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

// ClassicEditor
//     .create( document.querySelector( '#editor' ), {
//         alignment: {
//             options: [ 'left', 'right' ]
//         }
//     } )
//     .then(  )
//     .catch( );
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  @Output() open: EventEmitter<any> = new EventEmitter();
  public Editor = DecoupledEditor;
  data=""
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}
fetchData(){
   this.open.emit(this.data);
}
  ngOnInit() {
 
    //ClassicEditor.builtinPlugins.map( plugin => console.log(plugin.pluginName) );
  }

}
