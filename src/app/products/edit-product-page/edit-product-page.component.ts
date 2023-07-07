import { HtmlParser } from '@angular/compiler';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditedProduct } from 'src/app/_models/products/EditedProduct';
import { Product } from 'src/app/_models/products/Product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html',
  styleUrls: ['./edit-product-page.component.css']
})
export class EditProductPageComponent {


  constructor(private productService: ProductService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router){}

  product: Product | undefined
  editedProduct: EditedProduct | undefined

  abortProductEdit: boolean = false;

  ngOnInit()
  {
    this.LoadProduct()
  }

  LoadProduct()
  {
    let productName = this.route.snapshot.paramMap.get("name");
    if(!productName){return}

    this.productService.GetProductByName(productName).subscribe(
      {
        next: response => {this.product = response},
        error: error => console.log(error)
      })
  }

  EditProduct()
  {
    this.CreateEditedProduct()
    if(this.abortProductEdit){return}

    if(!this.editedProduct){return}
    this.productService.EditProduct(this.editedProduct).subscribe(
      {
        next: () => {this.toastr.success("Product Edited", "Success!"), this.router.navigateByUrl("/products")},
        error: () => this.toastr.error("Product was not updated", "Warning!")
      })
  }

  DeleteProduct()
  {
    if(!this.product){return}
    this.productService.DeleteProduct(this.product.id).subscribe(
      {
        next: () => {this.toastr.success("Product Deleted", "Success!"), this.router.navigateByUrl("/products")},
        error: () => this.toastr.error("Could not delete product", "Warning!")
      })
  }

  CreateEditedProduct()
  {
    if(!this.product){return}

    this.editedProduct = 
    {
      Id: this.product.id,
      Code: this.product.code,
      Name: this.product.name,
      UnitOfMeasure: this.product.unitOfMeasure,
      Price: this.product.price,
      StorageQuantity: this.product.storageQuantity
    }

    this.ValidateProduct(this.editedProduct)
  }


  ValidateProduct(product: EditedProduct)
  {
    this.abortProductEdit = false;
    if(product.Code == 0 || product.Code == null || product.Code == undefined){this.toastr.error("Enter Product Code", "Warning!"); this.abortProductEdit = true}
    if(product.Name == ""){this.toastr.error("Enter Product Name", "Warning!"); this.abortProductEdit = true}
    if(product.Price == 0 || product.Price == null || product.Price == undefined){this.toastr.error("Enter Product Price", "Warning!"); this.abortProductEdit = true}
    if(product.UnitOfMeasure == ""){this.toastr.error("Enter Product Unit of Measure", "Warning!"); this.abortProductEdit = true}
    if(product.StorageQuantity == 0 || product.StorageQuantity == null || product.StorageQuantity == undefined){this.toastr.error("Enter Product Storage Quantity", "Warning!"); this.abortProductEdit = true}
  }

}
