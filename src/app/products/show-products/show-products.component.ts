import { Component } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent {

  constructor(private productService: ProductService){}

  products: any

  ngOnInit()
  {
    this.productService.GetProducts().subscribe(
      {
        next: response => this.products = response,
        error: error => console.log(error)      
      })
  }

}
