import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowProductsComponent } from './products/show-products/show-products.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SideNavComponent } from './home/side-nav/side-nav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MainProductPageComponent } from './products/main-product-page/main-product-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowProductsComponent,
    HomePageComponent,
    SideNavComponent,
    MainProductPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
