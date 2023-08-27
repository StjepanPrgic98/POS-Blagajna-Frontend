import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseHistoryFilters } from 'src/app/_models/date-time/PurchaseHistoryFilters';
import { ReceiptItem } from 'src/app/_models/receipt-items/ReceiptItem';
import { Receipt } from 'src/app/_models/receipts/Receipt';
import { ReceiptHistory } from 'src/app/_models/receipts/ReceiptHistory';
import { ReceiptService } from 'src/app/_services/receipt.service';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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

  displayHistoryForDay: boolean = true
  displayHistoryForMonth: boolean = false
  displayHistoryForYear: boolean = false
  datepickerModel: Date | undefined;
  dateChanged: boolean = false;

  date: any;
  bsInlineValue = new Date();
  bsConfig: Partial<BsDatepickerConfig> | undefined;

  
  

  
  ngOnInit()
  {
    this.GetHistoryFilters()
  }

  GetHistory(purchaseHistoryFilters: PurchaseHistoryFilters, option: string)
  {
    if(!this.purchaseHistoryFilters){return}
    this.receiptService.GetReceiptsForChosenDate(purchaseHistoryFilters, option).subscribe(
      {
        next: response => {this.receiptHistory = response, this.receipts = response.receipts, console.log(response)},
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
    
    this.GetHistory(this.purchaseHistoryFilters,"day")
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

  CalculateReceiptTime(receipt: Receipt)
  {
    const datePipe = new DatePipe('en-US');

    const date = new Date(receipt.date);

    const timeString = datePipe.transform(date, 'HH:mm');

    return timeString;
  }

  CalculateReceiptDate(receipt: Receipt)
  {
    const datePipe = new DatePipe('en-US');

    const date = new Date(receipt.date);

    const dateString = datePipe.transform(date, 'dd/MM');

    return dateString;
  }

  FilterHistory(option: string)
  {
    this.ResetHistoryFilterOption()

    if(option == "day"){this.displayHistoryForDay = true}
    if(option == "month"){this.displayHistoryForMonth = true}
    if(option == "year"){this.displayHistoryForYear = true}

  }

  ResetHistoryFilterOption()
  {
    this.displayHistoryForDay = false
    this.displayHistoryForMonth = false
    this.displayHistoryForYear = false
  }

  onDateChange(date: Date): void 
  {
    if (this.dateChanged == false) 
    {
      this.dateChanged = true;
    } 
    else 
    {
      
      this.purchaseHistoryFilters = 
      {
        Day: date.getDate(),
        Month: date.getMonth() + 1,
        Year: date.getFullYear()
      }
      
      if(this.displayHistoryForDay){this.GetHistory(this.purchaseHistoryFilters, "day")}
      if(this.displayHistoryForMonth){this.GetHistory(this.purchaseHistoryFilters, "month")}
      if(this.displayHistoryForYear){this.GetHistory(this.purchaseHistoryFilters, "year")}
    }

  }

  GoToReceiptDetails(receipt: Receipt)
  {
    this.receiptService.SaveReceiptInCache(receipt)
    this.router.navigateByUrl("pos/detail")
  }

  
}
