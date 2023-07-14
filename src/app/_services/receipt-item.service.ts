import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceiptItem } from '../_models/receipt-items/ReceiptItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptItemService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:5000/api/receiptItems/"

  public CreateMultiple(receipt: ReceiptItem[]): Observable<ReceiptItem[]>
  {
    return this.http.post(this.baseUrl + "createMultiple", receipt) as Observable<ReceiptItem[]>;
  }
}
