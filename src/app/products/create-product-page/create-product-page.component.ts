import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewProduct } from 'src/app/_models/products/NewProduct';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-create-product-page',
  templateUrl: './create-product-page.component.html',
  styleUrls: ['./create-product-page.component.css']
})
export class CreateProductPageComponent {

  constructor(private toastr: ToastrService, private productService: ProductService, private router: Router){}

  abortProductCreation: boolean = false;

  newProduct: NewProduct = 
  {
    Code: undefined, Name: "", UnitOfMeasure: "", Price: undefined, StorageQuantity: undefined
  }

  CreateProduct()
  {
    this.ValidateProduct(this.newProduct)
    if(this.abortProductCreation){return}

    this.productService.CreateProduct(this.newProduct).subscribe(
      {
        next: () => {this.toastr.success("Product created", "Success!"), this.router.navigateByUrl("/products")}
      })
  }


  ValidateProduct(product: NewProduct)
  {
    this.abortProductCreation = false;
    if(product.Code == 0 || product.Code == null || product.Code == undefined){this.toastr.error("Enter Product Code", "Warning!"); this.abortProductCreation = true}
    if(product.Name == ""){this.toastr.error("Enter Product Name", "Warning!"); this.abortProductCreation = true}
    if(product.Price == 0 || product.Price == null || product.Price == undefined){this.toastr.error("Enter Product Price", "Warning!"); this.abortProductCreation = true}
    if(product.UnitOfMeasure == ""){this.toastr.error("Enter Product Unit of Measure", "Warning!"); this.abortProductCreation = true}
    if(product.StorageQuantity == 0 || product.StorageQuantity == null || product.StorageQuantity == undefined){this.toastr.error("Enter Product Storage Quantity", "Warning!"); this.abortProductCreation = true}
  }

  


  

}
