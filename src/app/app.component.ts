import { Component } from '@angular/core';
import { ProductService } from './_services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private productService: ProductService){}
  /*@HostListener("window:beforeunload", ["$event"])
    unloadNotification($event: any)
    {
      $event.returnValue = true;
    }*/

  title = 'POS-Blagajna-Frontend';

  products: any

  ngOnInit()
  {
    this.productService.GetProducts().subscribe(
      {
        next: response => this.products = response,
        error: error => console.log(error)      
      })
  }
}
