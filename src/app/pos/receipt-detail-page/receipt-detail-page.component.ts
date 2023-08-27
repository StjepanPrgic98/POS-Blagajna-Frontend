import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ReceiptItem } from 'src/app/_models/receipt-items/ReceiptItem';
import { Receipt } from 'src/app/_models/receipts/Receipt';
import { ReceiptTotals } from 'src/app/_models/receipts/ReceiptTotals';
import { User } from 'src/app/_models/users/User';
import { ReceiptService } from 'src/app/_services/receipt.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-receipt-detail-page',
  templateUrl: './receipt-detail-page.component.html',
  styleUrls: ['./receipt-detail-page.component.css']
})
export class ReceiptDetailPageComponent {

  constructor(private receiptService: ReceiptService, private router: Router, private toastr: ToastrService, private userService: UserService, private modalService: BsModalService){}

  receipt: Receipt | undefined
  receiptItems: ReceiptItem[] = []
  receiptTotals: ReceiptTotals = {Tax: 0, Total: 0, SubTotal: 0, TotalDiscounts: 0}
  baseTax: number = 2

  modalRef?: BsModalRef;
  message?: string;


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

    console.log(this.receipt)
  }

  CalculateReceiptTotals() {
    for (let i = 0; i < this.receiptItems.length; i++)
    {
      this.receiptTotals.TotalDiscounts += this.receiptItems[i].discountAmmount;
      this.receiptTotals.SubTotal += this.receiptItems[i].totalPrice;
    }
    
    const tax = this.receiptTotals.SubTotal * this.baseTax / 100;
    

    this.receiptTotals.Tax = tax;
    this.receiptTotals.Total = this.receiptTotals.SubTotal + this.receiptTotals.Tax;
  

    this.receiptTotals.SubTotal = +this.receiptTotals.SubTotal.toFixed(2);
    this.receiptTotals.Tax = +this.receiptTotals.Tax.toFixed(2);
    this.receiptTotals.Total = +this.receiptTotals.Total.toFixed(2);
  }
  

  DeleteReceipt(id: number)
  {
    this.receiptService.DeleteReceipt(id).subscribe(
      {
        next: () => {this.toastr.success("Receipt deleted", "Success!"), this.router.navigateByUrl("/pos/history")},
        error: error => {this.toastr.error("Failed to delete receipt", "Warning!"), console.log(error)}
      })
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
