import { Component } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-main-product-page',
  templateUrl: './main-product-page.component.html',
  styleUrls: ['./main-product-page.component.css']
})
export class MainProductPageComponent {

  constructor(private productService: ProductService){}

  products: any

  ngOnInit()
  {
    this.GetProducts()
  }

  GetProducts()
  {
    this.productService.GetProducts().subscribe(
      {
        next: response => {this.products = response, console.log(response)},
        error: error => console.log(error)      
      })
  }

}
