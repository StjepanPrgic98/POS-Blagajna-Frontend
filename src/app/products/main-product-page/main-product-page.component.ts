import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EditedProduct } from 'src/app/_models/products/EditedProduct';
import { NewProduct } from 'src/app/_models/products/NewProduct';
import { Product } from 'src/app/_models/products/Product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-main-product-page',
  templateUrl: './main-product-page.component.html',
  styleUrls: ['./main-product-page.component.css']
})
export class MainProductPageComponent {

  constructor(private productService: ProductService, private route: ActivatedRoute, private toastr: ToastrService, private modalService: BsModalService){}

  products: any
  productCode: number | undefined;
  productName: string = "";

  newProduct: NewProduct = 
  {
    Code: undefined, Name: "", UnitOfMeasure: "", Price: undefined, StorageQuantity: undefined
  }
  abortProductCreation: boolean = false;
  isUpdatingProduct: boolean = false;

  editedProduct: EditedProduct = {Id: 0, Code: 0, Name: "", UnitOfMeasure: "", Price: 0, StorageQuantity: 0}
  abortProductEdit: boolean = false

  increaseProductQuantity: number = 0

  modalRef?: BsModalRef;
  message?: string;

  
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


  CreateProduct()
  {
    this.ValidateProduct(this.newProduct)
    if(this.abortProductCreation){return}

    this.productService.CreateProduct(this.newProduct).subscribe(
      {
        next: () => {this.toastr.success("Product created", "Success!"), this.GetProducts(), this.newProduct = {Code: undefined, Name: "", UnitOfMeasure: "", Price: undefined, StorageQuantity: undefined}}
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

  StartUpdatingProduct(product: Product)
  {
    this.isUpdatingProduct = true

    this.editedProduct = 
    {
      Id: product.id,
      Code: product.code,
      Name: product.name,
      Price: product.price,
      StorageQuantity: product.storageQuantity,
      UnitOfMeasure: product.unitOfMeasure
    }
  }

  ValidateEditedProduct(product: EditedProduct)
  {
    this.abortProductEdit = false;
    if(product.Code == 0 || product.Code == null || product.Code == undefined){this.toastr.error("Enter Product Code", "Warning!"); this.abortProductEdit = true}
    if(product.Name == ""){this.toastr.error("Enter Product Name", "Warning!"); this.abortProductEdit = true}
    if(product.Price == 0 || product.Price == null || product.Price == undefined){this.toastr.error("Enter Product Price", "Warning!"); this.abortProductEdit = true}
    if(product.UnitOfMeasure == ""){this.toastr.error("Enter Product Unit of Measure", "Warning!"); this.abortProductEdit = true}
    if(product.StorageQuantity == 0 || product.StorageQuantity == null || product.StorageQuantity == undefined){this.toastr.error("Enter Product Storage Quantity", "Warning!"); this.abortProductEdit = true}
  }

  EditProduct()
  {
    this.ValidateEditedProduct(this.editedProduct)

    if(this.abortProductEdit){return}

    if(!this.editedProduct){return}
    this.productService.EditProduct(this.editedProduct).subscribe(
      {
        next: () => {this.toastr.success("Product Edited", "Success!"), this.GetProducts(), this.StopProductEditing()},
        error: () => this.toastr.error("Product was not updated", "Warning!")
      })
  }

  DeleteProduct()
  {
    this.productService.DeleteProduct(this.editedProduct.Id).subscribe(
      {
        next: () => {this.toastr.success("Product Deleted", "Success!"), this.GetProducts(), this.StopProductEditing()},
        error: error => {this.toastr.error("Could not delete product", "Warning!"), console.log(error)}
      })
  }

  StopProductEditing()
  {
    this.editedProduct = {Id: 0, Code: 0, Name: "", UnitOfMeasure: "", Price: 0, StorageQuantity: 0}
    this.newProduct = {Code: undefined, Name: "", UnitOfMeasure: "", Price: undefined, StorageQuantity: undefined}
    this.isUpdatingProduct = false
  }

  IncreaseProductQuantity()
  {
    const backupQuantity = this.editedProduct.StorageQuantity
    this.editedProduct.StorageQuantity += this.increaseProductQuantity
    if(this.editedProduct.StorageQuantity < 0){this.editedProduct.StorageQuantity = backupQuantity; this.toastr.warning("The quantity can not be a negative!", "Warning")}
    this.increaseProductQuantity = 0
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

}
