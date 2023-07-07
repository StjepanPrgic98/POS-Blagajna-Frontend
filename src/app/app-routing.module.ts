import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowProductsComponent } from './products/show-products/show-products.component';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = 
[
  {path: "", component: HomePageComponent},
  {path: "products", component: ShowProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
