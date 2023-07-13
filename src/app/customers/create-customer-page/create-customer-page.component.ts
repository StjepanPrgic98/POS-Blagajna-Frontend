import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewCustomer } from 'src/app/_models/customers/NewCustomer';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-create-customer-page',
  templateUrl: './create-customer-page.component.html',
  styleUrls: ['./create-customer-page.component.css']
})
export class CreateCustomerPageComponent {

  constructor(private customerService: CustomerService, private toastr: ToastrService, private router: Router){}


  newCustomer: NewCustomer = {Name: "", Address: "", Town: ""}

  CreateCustomer()
  {
    this.customerService.CreateCustomer(this.newCustomer).subscribe(
      {
        next: () => {this.toastr.success("New customer created", "Success!"), this.router.navigateByUrl("/customers")},
        error: () => this.toastr.error("Failed to create new customer", "Warning!")
      })
  }

}
