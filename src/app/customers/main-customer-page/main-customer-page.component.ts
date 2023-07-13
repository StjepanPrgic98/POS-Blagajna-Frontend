import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/_models/customers/Customer';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-main-customer-page',
  templateUrl: './main-customer-page.component.html',
  styleUrls: ['./main-customer-page.component.css']
})
export class MainCustomerPageComponent {

  constructor(private customerService: CustomerService, private toastr: ToastrService){}

  customers: Customer[] | undefined
  
  customerName: string = ""

  ngOnInit()
  {
    this.GetCustomers()
  }


  GetCustomers()
  {
    this.customerService.GetAllCustomers().subscribe(
      {
        next: response => {this.customers = response},
        error: () => this.toastr.error("Could not get customers", "Warning!")
        
      })
  }

  GetCustomersThatContainsName()
  {
    if(!this.customerName){this.GetCustomers(); return;}
    
    this.customerService.GetCustomersThatContainsName(this.customerName).subscribe(
      {
        next: response => {this.customers = response},
        error: error => console.log(error)
      })
  }

}
