import { ChangeDetectorRef, Component } from '@angular/core';
import { Product } from 'src/app/_models/products/Product';
import { NewReceiptItem } from 'src/app/_models/receipt-items/NewReceiptItem';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-main-pos-page',
  templateUrl: './main-pos-page.component.html',
  styleUrls: ['./main-pos-page.component.css']
})
export class MainPosPageComponent {


  products: Product[] | undefined
  productChosen: Product | undefined
  productCode: number | undefined;
  productName: string = "";
  productPrice: number = 0;

  newReceiptItem: NewReceiptItem = {ProductName: "", Quantity: 0, Price: 0, DiscountPercentage: 0,DiscountAmmount: 0, TotalPrice: 0}
  receiptItems: NewReceiptItem[] = []
  receiptItemDiscountPercentage: number = 10


  constructor(private productService: ProductService, private changeDetector: ChangeDetectorRef) {

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
    this.productChosen = product

    for (let i = 0; i < this.receiptItems.length; i++) 
    {
      if(product.name == this.receiptItems[i].ProductName)
      {
        return
      }
      
    }
    
    
    this.newReceiptItem = 
    {
      ProductName: product.name,
      Quantity: 1,
      Price: product.price,
      DiscountPercentage: 0,
      DiscountAmmount: 0,
      TotalPrice: product.price
    }


    this.receiptItems.push(this.newReceiptItem)
    
    console.log(this.receiptItems)
  }


  SubmitProductQuantity(existingReceiptItem: NewReceiptItem)
  {
    this.GetCurrentProductPrice(existingReceiptItem.ProductName)
    
    if(!this.productPrice){return}
    if(existingReceiptItem.Quantity <= 0 || existingReceiptItem.Quantity == null){existingReceiptItem.Quantity = 1}
   
    existingReceiptItem.Price = this.productPrice * existingReceiptItem.Quantity

    if(existingReceiptItem.DiscountPercentage == 0){existingReceiptItem.TotalPrice = existingReceiptItem.Price}
    else
    {
      existingReceiptItem.DiscountAmmount = (existingReceiptItem.Price * existingReceiptItem.DiscountPercentage) / 100

      existingReceiptItem.TotalPrice = existingReceiptItem.Price
       - existingReceiptItem.DiscountAmmount
    }

    
  }


  SubmitProductDiscount(existingReceiptItem: NewReceiptItem)
  {
    console.log(existingReceiptItem.DiscountPercentage)

    if(existingReceiptItem.DiscountPercentage < 0 || existingReceiptItem.DiscountPercentage == null || existingReceiptItem.DiscountPercentage > 100)
    {
      existingReceiptItem.DiscountPercentage = 0
    }

    if(existingReceiptItem.DiscountPercentage == 0){existingReceiptItem.TotalPrice = existingReceiptItem.Price}
    else
    {
      existingReceiptItem.DiscountAmmount = (existingReceiptItem.Price * existingReceiptItem.DiscountPercentage) / 100

      existingReceiptItem.TotalPrice = existingReceiptItem.Price
       - existingReceiptItem.DiscountAmmount
    }
  }

  GetCurrentProductPrice(productName: string)
  {
    if(!this.products){return}
    for (let i = 0; i < this.products.length; i++)
    {
      if(productName == this.products[i].name)
      {
        this.productPrice = this.products[i].price
      }
    }
  }

  DeleteReceiptItem(receiptItemToDelete: NewReceiptItem) {
    const index = this.receiptItems.indexOf(receiptItemToDelete);
    if (index !== -1) {
      this.receiptItems.splice(index, 1);
    }
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

  }
  


