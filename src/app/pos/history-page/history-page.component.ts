import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseHistoryFilters } from 'src/app/_models/date-time/PurchaseHistoryFilters';
import { ReceiptItem } from 'src/app/_models/receipt-items/ReceiptItem';
import { Receipt } from 'src/app/_models/receipts/Receipt';
import { ReceiptHistory } from 'src/app/_models/receipts/ReceiptHistory';
import { ReceiptService } from 'src/app/_services/receipt.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent {

  constructor(private receiptService: ReceiptService, private toastr: ToastrService,
    private router: Router
    ){}

  receiptHistory: ReceiptHistory | undefined
  
  receipts: Receipt[] | undefined
  currentDateTime: Date | undefined
  purchaseHistoryFilters: PurchaseHistoryFilters | undefined

  displayCurrentDay: boolean = false
  displayMonth: boolean = false
  displayYear: boolean = false
  
  ngOnInit()
  {
    this.GetHistoryFilters()
  }

  GetHistory()
  {
    if(!this.purchaseHistoryFilters){return}
    this.receiptService.GetReceiptsForChosenDate(this.purchaseHistoryFilters, "day").subscribe(
      {
        next: response => {this.receiptHistory = response, this.receipts = response.receipts},
        error: error => console.log(error)
      })
  }

  GetHistoryFilters()
  {
    this.currentDateTime = new Date();

    this.purchaseHistoryFilters = 
    {
      Day: this.currentDateTime.getDate(),
      Month: this.currentDateTime.getMonth() + 1,
      Year: this.currentDateTime.getFullYear()
    }
    
    this.GetHistory()
  }

  CalculateReceiptsTotalPrice(receiptItems: ReceiptItem[])
  {
    let totalPrice = 0

    for (let i = 0; i < receiptItems.length; i++) 
    {
        totalPrice += receiptItems[i].totalPrice
    }

    return Number(totalPrice.toFixed(2));
  }

  CalculateReceiptDate(receipt: Receipt)
  {
    const datePipe = new DatePipe('en-US');

    const date = new Date(receipt.date);

    const timeString = datePipe.transform(date, 'HH:mm');

    return timeString;
  }

  
}
