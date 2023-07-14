import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/_models/customers/Customer';
import { Product } from 'src/app/_models/products/Product';
import { NewReceiptItem } from 'src/app/_models/receipt-items/NewReceiptItem';
import { NewReceipt } from 'src/app/_models/receipts/NewReceipt';
import { ReceiptTotals } from 'src/app/_models/receipts/ReceiptTotals';
import { CustomerService } from 'src/app/_services/customer.service';
import { ProductService } from 'src/app/_services/product.service';
import { ReceiptItemService } from 'src/app/_services/receipt-item.service';
import { ReceiptService } from 'src/app/_services/receipt.service';

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

  receiptTotals: ReceiptTotals = {Tax: 0, TotalDiscounts: 0, SubTotal: 0, Total: 0}
  baseTax: number = 2

  customer: Customer | undefined
  customers: Customer[] = []
  customerName: string = ""
  showCustomerData: boolean = false

  receipt: NewReceipt = {Number: 0, Note: "", CustomerName: "", ReceiptItems: []}

  constructor(private productService: ProductService,
    private elementRef: ElementRef,
    private customerService: CustomerService,
    private receiptService: ReceiptService,
    private toastr: ToastrService,
    private receiptItemService: ReceiptItemService
    ) {

  }

  ngOnInit()
  {
    this.GetProducts()
  }

  GetNewReceiptNumber()
  {
    this.receiptService.GetNewReceiptNumber().subscribe(
      {
        next: response => {this.receipt.Number = response},
        error: error => console.log(error)
      })
  }

  GetProducts()
  {
    this.productService.GetProducts().subscribe(
      {
        next: response => {this.products = response, this.GetNewReceiptNumber()},
        error: error => console.log(error)      
      })
  }

  GetCustomersThatContainsName()
  {
    this.customerService.GetCustomersThatContainsName(this.customerName).subscribe(
      {
        next: response => {this.customers = response},
        error: error => console.log(error)
      })
  }

  SetCustomer(chosenCustomer: Customer)
  {
    this.customer = chosenCustomer
    this.showCustomerData = true
  }

  ShowSearchCustomerField()
  {
    this.customerName = ""
    this.customers = []
    this.customer = undefined
    this.showCustomerData = false
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
    
    this.scrollToBottomWithDelay();

    this.CalculateReceiptTotals()
  }


  SubmitProductQuantity(existingReceiptItem: NewReceiptItem) 
  {

    this.GetCurrentProductPrice(existingReceiptItem.ProductName);
  
    if (!this.productPrice){return;}
    
    if (existingReceiptItem.Quantity <= 0 || existingReceiptItem.Quantity == null) 
    {
      existingReceiptItem.Quantity = 1;
    }
    
    existingReceiptItem.Price = +(this.productPrice * existingReceiptItem.Quantity).toFixed(2);
  
    if (existingReceiptItem.DiscountPercentage == 0) 
    {
      existingReceiptItem.TotalPrice = existingReceiptItem.Price;
    } 
    else
    {
      existingReceiptItem.DiscountAmmount = +(existingReceiptItem.Price * existingReceiptItem.DiscountPercentage / 100).toFixed(2);
      existingReceiptItem.TotalPrice = +(existingReceiptItem.Price - existingReceiptItem.DiscountAmmount).toFixed(2);
    }
  
    this.CalculateReceiptTotals();
  }
  


  SubmitProductDiscount(existingReceiptItem: NewReceiptItem)
  {

    if(existingReceiptItem.DiscountPercentage < 0 || existingReceiptItem.DiscountPercentage == null || existingReceiptItem.DiscountPercentage > 100)
    {
      existingReceiptItem.DiscountPercentage = 0
    }

    if (existingReceiptItem.DiscountPercentage == 0) 
    {
      existingReceiptItem.TotalPrice = existingReceiptItem.Price;
    } 
    else
    {
      existingReceiptItem.DiscountAmmount = +(existingReceiptItem.Price * existingReceiptItem.DiscountPercentage / 100).toFixed(2);
      existingReceiptItem.TotalPrice = +(existingReceiptItem.Price - existingReceiptItem.DiscountAmmount).toFixed(2);
    }

    this.CalculateReceiptTotals()
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

  DeleteReceiptItem(receiptItemToDelete: NewReceiptItem) 
  {

    const index = this.receiptItems.indexOf(receiptItemToDelete);

    if (index !== -1) 
    {
      this.receiptItems.splice(index, 1);
    }

    console.log(this.receiptItems)
  }

  CalculateReceiptTotals()
  {
    this.ResetReceiptTotals()

    for (let i = 0; i < this.receiptItems.length; i++) 
    {
      this.receiptTotals.TotalDiscounts += +(this.receiptItems[i].DiscountAmmount.toFixed(2));
      this.receiptTotals.SubTotal += +(this.receiptItems[i].TotalPrice.toFixed(2));
    }
    
    
    const tax = this.receiptTotals.SubTotal * this.baseTax / 100;
    this.receiptTotals.Tax = parseFloat(tax.toFixed(2));
    this.receiptTotals.Total = parseFloat((this.receiptTotals.SubTotal - this.receiptTotals.TotalDiscounts + this.receiptTotals.Tax).toFixed(2))

  }

  ResetReceiptTotals()
  {
    this.receiptTotals.SubTotal = 0
    this.receiptTotals.Tax = 0
    this.receiptTotals.Total = 0
    this.receiptTotals.TotalDiscounts = 0
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

  GenerateReceiptData()
  {
    this.receipt.ReceiptItems = this.receiptItems;

    if(!this.customer)
    {
      this.receipt.CustomerName = "-";
      this.receipt.Note = "Purchase made without bonus card!"
    }
    else
    {
      this.receipt.CustomerName = this.customer.name;
      this.receipt.Note = "Purchase made with bonus card!"
    }

    this.CreateReceipt(this.receipt)
  }

  CreateReceipt(receipt: NewReceipt)
  {
    console.log(receipt)
    
    this.receiptService.CreateReceipt(receipt).subscribe(
      {
        next: () => {this.toastr.success("Purchase complete", "Success!", {positionClass: "toast-top-center"}), this.ResetPOSData()},
        error: error => {this.toastr.error("Purchase failed", "Warning!"), console.log(error)}
      })
    
  }

  ResetPOSData()
  {
    this.GetProducts()
    
    this.showCustomerData = false
    this.customer = undefined
    this.customers = []
    this.customerName = ""

    this.receiptItems = []
    this.receiptTotals.SubTotal = 0
    this.receiptTotals.Tax = 0
    this.receiptTotals.Total = 0
    this.receiptTotals.TotalDiscounts = 0

    this.productName = ""
    this.productCode = undefined
    
    this.GetNewReceiptNumber()
  }




  

 

  scrollToBottomWithDelay(delay: number = 50) {
    setTimeout(() => {
      const container = this.elementRef.nativeElement.querySelector('.scrollable-container-receipt-items');
      container.scrollTop = container.scrollHeight;
    }, delay);
  }

  }
  


