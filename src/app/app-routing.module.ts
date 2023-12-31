import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { MainProductPageComponent } from './products/main-product-page/main-product-page.component';
import { CreateProductPageComponent } from './products/create-product-page/create-product-page.component';
import { EditProductPageComponent } from './products/edit-product-page/edit-product-page.component';
import { MainPosPageComponent } from './pos/main-pos-page/main-pos-page.component';
import { MainCustomerPageComponent } from './customers/main-customer-page/main-customer-page.component';
import { CreateCustomerPageComponent } from './customers/create-customer-page/create-customer-page.component';
import { EditCustomerPageComponent } from './customers/edit-customer-page/edit-customer-page.component';
import { HistoryPageComponent } from './pos/history-page/history-page.component';
import { ReceiptDetailPageComponent } from './pos/receipt-detail-page/receipt-detail-page.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = 
[
  {path: "", component: HomePageComponent},

  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: 
    [
      {path: "products", component: MainProductPageComponent},
      {path: "products/create", component: CreateProductPageComponent},
      {path: "products/edit/:name", component: EditProductPageComponent},
    
      {path: "pos", component: MainPosPageComponent, canActivate: [AuthGuard]},
      {path: "pos/history", component: HistoryPageComponent},
      {path: "pos/detail", component: ReceiptDetailPageComponent},
    
      {path: "customers", component: MainCustomerPageComponent},
      {path: "customers/create", component: CreateCustomerPageComponent},
      {path: "customers/edit/:name", component: EditCustomerPageComponent},
    ]
  },

  

  {path: "**", component: HomePageComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
