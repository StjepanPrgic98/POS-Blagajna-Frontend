import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:5000/api/products/"

  public GetProducts(): Observable<any>
  {
    return this.http.get(this.baseUrl)
  }

  public GetProductsThatContainCode(code: number): Observable<any>
  {
    return this.http.get(this.baseUrl + "code/" + code)
  }

  public GetProductsThatContainName(name: string): Observable<any>
  {
    return this.http.get(this.baseUrl + "name/" + name)
  }
}
