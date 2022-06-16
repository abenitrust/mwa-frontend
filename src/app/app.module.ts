import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { PartsComponent } from './parts/parts.component';
import { PartComponent } from './part/part.component';
import { CreateEditPartComponent } from './create-edit-part/create-edit-part.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagerComponent } from './pager/pager.component'
 
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    PartsComponent,
    PartComponent,
    CreateEditPartComponent,
    PageNotFoundComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
