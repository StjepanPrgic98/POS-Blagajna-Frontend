import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewReceipt } from '../_models/receipts/NewReceipt';
import { PurchaseHistoryFilters } from '../_models/date-time/PurchaseHistoryFilters';
import { Receipt } from '../_models/receipts/Receipt';
import { ReceiptHistory } from '../_models/receipts/ReceiptHistory';
import { UrlMatchResult } from '@angular/router';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  receipt: Receipt | undefined
  historyDate: Date | undefined
  filterOption: string = ""

  baseUrl: string = environment.baseUrl + "receipts/"

  public GetNewReceiptNumber(): Observable<number>
  {
    return this.http.get(this.baseUrl + "newReceiptNumber") as Observable<number>;
  }

  public CreateReceipt(receipt: NewReceipt): Observable<boolean>
  {
    return this.http.post(this.baseUrl + "create", receipt) as Observable<boolean>;
  }

  public DeleteReceipt(id: number): Observable<boolean>
  {
    return this.http.delete(this.baseUrl + "delete/" + id) as Observable<boolean>;
  }

  public GetReceiptsForChosenDate(purchaseHistoryFilters: PurchaseHistoryFilters, filterOptions: string): Observable<ReceiptHistory>
  {
    return this.http.post(this.baseUrl + "purchaseHistory/" + filterOptions, purchaseHistoryFilters) as Observable<ReceiptHistory>;
  }


  public SaveReceiptInCache(receiptToSave: Receipt)
  {
    this.receipt = receiptToSave
  }
  public GetCachedReceipt()
  {
    return this.receipt
  }

  public SaveHistoryDate(date: Date)
  {
    this.historyDate = date
  }
  public SaveHistoryFilterOption(filter: string)
  {
    this.filterOption = filter
  }

  public GetHistoryDate()
  {
    return this.historyDate
  }
  public GetHistoryFilterOption()
  {
    return this.filterOption
  }
}
