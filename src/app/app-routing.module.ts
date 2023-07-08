import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { MainProductPageComponent } from './products/main-product-page/main-product-page.component';
import { CreateProductPageComponent } from './products/create-product-page/create-product-page.component';
import { EditProductPageComponent } from './products/edit-product-page/edit-product-page.component';
import { MainPosPageComponent } from './pos/main-pos-page/main-pos-page.component';

const routes: Routes = 
[
  {path: "", component: HomePageComponent},
  {path: "products", component: MainProductPageComponent},
  {path: "products/create", component: CreateProductPageComponent},
  {path: "products/edit/:name", component: EditProductPageComponent},

  {path: "pos", component: MainPosPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
