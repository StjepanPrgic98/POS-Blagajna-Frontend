import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SideNavComponent } from './home/side-nav/side-nav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MainProductPageComponent } from './products/main-product-page/main-product-page.component';
import { CreateProductPageComponent } from './products/create-product-page/create-product-page.component';
import { ToastrModule } from 'ngx-toastr';
import { EditProductPageComponent } from './products/edit-product-page/edit-product-page.component';
import { MainPosPageComponent } from './pos/main-pos-page/main-pos-page.component';
import { MainCustomerPageComponent } from './customers/main-customer-page/main-customer-page.component';
import { CreateCustomerPageComponent } from './customers/create-customer-page/create-customer-page.component';
import { EditCustomerPageComponent } from './customers/edit-customer-page/edit-customer-page.component';
import { HistoryPageComponent } from './pos/history-page/history-page.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReceiptDetailPageComponent } from './pos/receipt-detail-page/receipt-detail-page.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SideNavComponent,
    MainProductPageComponent,
    CreateProductPageComponent,
    EditProductPageComponent,
    MainPosPageComponent,
    MainCustomerPageComponent,
    CreateCustomerPageComponent,
    EditCustomerPageComponent,
    HistoryPageComponent,
    ReceiptDetailPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forChild(),
    ToastrModule.forRoot(
      {
        positionClass: "toast-bottom-right",
        timeOut: 5000,
        progressBar: true,
      })
  ],
  providers: 
  [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
