import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:5000/api/"

  public GetProducts(): Observable<any>
  {
    return this.http.get(this.baseUrl + "products")
  }
}
