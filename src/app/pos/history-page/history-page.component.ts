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

  CalculateReceiptDate(receipt: Receipt)
  {
    const datePipe = new DatePipe('en-US');

    const date = new Date(receipt.date);

    const timeString = datePipe.transform(date, 'HH:mm');

    return timeString;
  }

  FilterHistory(option: string)
  {
    this.ResetHistoryFilterOption()

    if(option == "day"){this.displayHistoryForDay = true}
    if(option == "month"){this.displayHistoryForMonth = true}
    if(option == "year"){this.displayHistoryForYear = true}

    if(!this.purchaseHistoryFilters){return}
    this.GetHistory(this.purchaseHistoryFilters, option)
  }

  ResetHistoryFilterOption()
  {
    this.displayHistoryForDay = false
    this.displayHistoryForMonth = false
    this.displayHistoryForYear = false
  }

  onDateChange(date: Date): void {
    if (this.dateChanged == false) {
      this.dateChanged = true;
    } else {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; 
      const day = date.getDate();

      const customDateString = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
      console.log(customDateString)

    }
  }

  
}
