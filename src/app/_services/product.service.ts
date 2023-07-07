import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NewProduct } from '../_models/products/NewProduct';
import { Product } from '../_models/products/Product';
import { EditedProduct } from '../_models/products/EditedProduct';


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

  public GetProductByName(name: string): Observable<Product>
  {
    return this.http.get(this.baseUrl + name) as Observable<Product>;
  }

  public GetProductsThatContainCode(code: number): Observable<any>
  {
    return this.http.get(this.baseUrl + "code/" + code)
  }

  public GetProductsThatContainName(name: string): Observable<any>
  {
    return this.http.get(this.baseUrl + "name/" + name)
  }

  public CreateProduct(product: NewProduct): Observable<any>
  {
    return this.http.post(this.baseUrl + "create", product)
  }

  public EditProduct(product: EditedProduct): Observable<boolean>
  {
    return this.http.put(this.baseUrl + "update", product) as Observable<boolean>
  }

  public DeleteProduct(id: number): Observable<boolean>
  {
    return this.http.delete(this.baseUrl + "delete/" + id) as Observable<boolean>
  }
}
