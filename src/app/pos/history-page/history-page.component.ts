import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PurchaseHistoryFilters } from 'src/app/_models/date-time/PurchaseHistoryFilters';
import { Receipt } from 'src/app/_models/receipts/Receipt';
import { ReceiptHistory } from 'src/app/_models/receipts/ReceiptHistory';
import { ReceiptService } from 'src/app/_services/receipt.service';

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
        next: response => {this.receiptHistory = response, console.log(this.receiptHistory)},
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

  

  
}
