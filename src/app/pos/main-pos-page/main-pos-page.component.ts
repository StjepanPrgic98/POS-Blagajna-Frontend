import { Component } from '@angular/core';
import { Product } from 'src/app/_models/products/Product';
import { NewReceiptItem } from 'src/app/_models/receipt-items/NewReceiptItem';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-main-pos-page',
  templateUrl: './main-pos-page.component.html',
  styleUrls: ['./main-pos-page.component.css']
})
export class MainPosPageComponent {
  time: string = ""
  date: string = ""

  products: Product[] | undefined
  productChosen: Product | undefined
  productCode: number | undefined;
  productName: string = "";

  newReceiptItem: NewReceiptItem = {ProductName: "", Quantity: 0, Price: 0, DiscountPercentage: 0, TotalPrice: 0}
  receiptItems: NewReceiptItem[] = []
  receiptItemQuantity: number = 0
  receiptItemDiscountPercentage: number = 10

  constructor(private productService: ProductService) {
    this.updateDateTime();
  }

  ngOnInit()
  {
    this.GetProducts()
  }

  GetProducts()
  {
    this.productService.GetProducts().subscribe(
      {
        next: response => {this.products = response},
        error: error => console.log(error)      
      })
  }

  CreateReceiptItem(product: Product)
  {
    this.receiptItemQuantity++;
    
    for (let i = 0; i < this.receiptItems.length; i++) 
    {
      if(product.name == this.receiptItems[i].ProductName)
      {
        this.receiptItems[i].Quantity++
        this.receiptItemQuantity = 0
        return
      }
      
    }
    
    
    this.newReceiptItem = 
    {
      ProductName: product.name,
      Quantity: this.receiptItemQuantity,
      Price: product.price * this.receiptItemQuantity,
      DiscountPercentage: this.receiptItemDiscountPercentage,
      TotalPrice: product.price - (product.price * this.receiptItemDiscountPercentage) / 100
    }

    console.log(this.newReceiptItem)

    this.receiptItems.push(this.newReceiptItem)
    
    console.log(this.receiptItems)
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

  updateDateTime() {
    setInterval(() => {
      const currentDateTime = new Date();
      this.time = currentDateTime.toLocaleTimeString();
      this.date = currentDateTime.toLocaleDateString();
    }, 1000);
  }
  

}
