import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewReceipt } from '../_models/receipts/NewReceipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:5000/api/receipts/"

  public GetNewReceiptNumber(): Observable<number>
  {
    return this.http.get(this.baseUrl + "newReceiptNumber") as Observable<number>;
  }

  public CreateReceipt(receipt: NewReceipt): Observable<boolean>
  {
    return this.http.post(this.baseUrl + "create", receipt) as Observable<boolean>;
  }
}
