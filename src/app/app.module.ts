import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CompetitiveNewsComponent } from './competitive-news/competitive-news.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    ProductListComponent,
    HomeComponent,
    CompetitiveNewsComponent,
    HeaderComponent,
    LoginComponent,
    TinyEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CKEditorModule,
    EditorModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:'home',
        component:HomeComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'news',
        component:CompetitiveNewsComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'tinyEditor',
        component:TinyEditorComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
