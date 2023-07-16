import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReceiptItem } from 'src/app/_models/receipt-items/ReceiptItem';
import { Receipt } from 'src/app/_models/receipts/Receipt';
import { ReceiptTotals } from 'src/app/_models/receipts/ReceiptTotals';
import { ReceiptService } from 'src/app/_services/receipt.service';

@Component({
  selector: 'app-receipt-detail-page',
  templateUrl: './receipt-detail-page.component.html',
  styleUrls: ['./receipt-detail-page.component.css']
})
export class ReceiptDetailPageComponent {

  constructor(private receiptService: ReceiptService, private router: Router, private toastr: ToastrService){}

  receipt: Receipt | undefined
  receiptItems: ReceiptItem[] = []
  receiptTotals: ReceiptTotals = {Tax: 0, Total: 0, SubTotal: 0, TotalDiscounts: 0}
  baseTax: number = 2

  ngOnInit()
  {
    if(this.receiptService.GetCachedReceipt() == null){this.router.navigateByUrl("pos/history")}

    this.GetReceipt()
  }

  GetReceipt()
  {
    this.receipt = this.receiptService.GetCachedReceipt()

    if(!this.receipt){return}
    this.receiptItems = this.receipt.receiptItems

    this.CalculateReceiptTotals()
  }

  CalculateReceiptTotals()
  {
    for (let i = 0; i < this.receiptItems.length; i++) 
    {
      this.receiptTotals.TotalDiscounts += +(this.receiptItems[i].discountAmmount.toFixed(2));
      this.receiptTotals.SubTotal += +(this.receiptItems[i].totalPrice.toFixed(2));
    }
    
    
    const tax = this.receiptTotals.SubTotal * this.baseTax / 100;
    this.receiptTotals.Tax = parseFloat(tax.toFixed(2));
    this.receiptTotals.Total = parseFloat((this.receiptTotals.SubTotal + this.receiptTotals.Tax).toFixed(2))
  }

  DeleteReceipt(id: number)
  {
    this.receiptService.DeleteReceipt(id).subscribe(
      {
        next: () => {this.toastr.success("Receipt deleted", "Success!"), this.router.navigateByUrl("/pos/history")},
        error: error => {this.toastr.error("Failed to delete receipt", "Warning!"), console.log(error)}
      })
  }
}
