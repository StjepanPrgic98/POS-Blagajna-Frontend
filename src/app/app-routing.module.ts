import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowProductsComponent } from './products/show-products/show-products.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { MainProductPageComponent } from './products/main-product-page/main-product-page.component';

const routes: Routes = 
[
  {path: "", component: HomePageComponent},
  {path: "products", component: MainProductPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
