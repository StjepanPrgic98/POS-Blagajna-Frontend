import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceiptItem } from '../_models/receipt-items/ReceiptItem';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptItemService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl + "receiptItems/"

  public CreateMultiple(receipt: ReceiptItem[]): Observable<ReceiptItem[]>
  {
    return this.http.post(this.baseUrl + "createMultiple", receipt) as Observable<ReceiptItem[]>;
  }
}
