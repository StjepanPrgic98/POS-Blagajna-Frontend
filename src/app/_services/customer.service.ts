import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../_models/customers/Customer';
import { NewCustomer } from '../_models/customers/NewCustomer';
import { EditedCustomer } from '../_models/customers/EditedCustomer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:5000/api/customers/"

  public GetAllCustomers(): Observable<Customer[]>
  {
    return this.http.get(this.baseUrl) as Observable<Customer[]>;
  }

  public CreateCustomer(customer: NewCustomer): Observable<boolean>
  {
    return this.http.post(this.baseUrl + "create", customer) as Observable<boolean>;
  }

  public UpdateCustomer(customer: EditedCustomer): Observable<boolean>
  {
    return this.http.put(this.baseUrl + "update", customer) as Observable<boolean>;
  }

  public DeleteCustomer(id: number): Observable<boolean>
  {
    return this.http.delete(this.baseUrl + "delete/" + id)as Observable<boolean>;
  }


  public GetCustomerByName(name: string): Observable<Customer>
  {
    return this.http.get(this.baseUrl + name) as Observable<Customer>;
  }

  public GetCustomersThatContainsName(name: string): Observable<Customer[]>
  {
    return this.http.get(this.baseUrl + "contains/" + name) as Observable<Customer[]>;
  }
}
