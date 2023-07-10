import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../_models/customers/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:5000/api/customers/"

  public GetAllCustomers(): Observable<Customer[]>
  {
    return this.http.get(this.baseUrl) as Observable<Customer[]>
  }
}
