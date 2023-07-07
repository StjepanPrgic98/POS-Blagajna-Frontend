import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-main-product-page',
  templateUrl: './main-product-page.component.html',
  styleUrls: ['./main-product-page.component.css']
})
export class MainProductPageComponent {

  constructor(private productService: ProductService, private route: ActivatedRoute){}

  products: any
  productCode: number | undefined;
  productName: string = "";

  ngOnInit()
  {
    this.GetProducts()
    this.productCode = undefined;
  }

  GetProducts()
  {
    this.productService.GetProducts().subscribe(
      {
        next: response => {this.products = response},
        error: error => console.log(error)      
      })
  }

  SearchProductsThatContainCode()
  {
    this.productName = ""
    if(this.productCode == undefined ||this.productCode <= 0 || this.productCode == null){this.GetProducts(); return}

    this.productService.GetProductsThatContainCode(this.productCode).subscribe(
      {
        next: response => {this.products = response},
        error: error => console.log(error)
      })
  }

  SearchProductsThatContainName()
  {
    this.productCode = undefined
    if(this.productName == ""){this.GetProducts(); return;}

    this.productService.GetProductsThatContainName(this.productName).subscribe(
      {
        next: response => {this.products = response},
        error: error => console.log(error)
      })
  }

}
