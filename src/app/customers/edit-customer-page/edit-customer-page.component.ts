import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/_models/customers/Customer';
import { EditedCustomer } from 'src/app/_models/customers/EditedCustomer';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-edit-customer-page',
  templateUrl: './edit-customer-page.component.html',
  styleUrls: ['./edit-customer-page.component.css']
})
export class EditCustomerPageComponent {

  constructor(private customerService: CustomerService, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute,
    ){}

  customer: Customer | undefined
  editedCustomer: EditedCustomer | undefined

  ngOnInit()
  {
    this.LoadCustomer()
  }

  LoadCustomer()
  {
    let customerName = this.route.snapshot.paramMap.get("name");

    if(!customerName){return}

    this.customerService.GetCustomerByName(customerName).subscribe(
      {
        next: response => {this.customer = response, console.log(response)},
        error: error => console.log(error)
      })
  }

  EditCustomer()
  {
    if(!this.customer){return;}

    this.editedCustomer = 
    {
      Id: this.customer.id,
      Name: this.customer.name,
      Address: this.customer.address,
      Town: this.customer.town
    }

    this.UpdateCustomer(this.editedCustomer)
    
  }

  UpdateCustomer(customer: EditedCustomer)
  {
    this.customerService.UpdateCustomer(customer).subscribe(
      {
        next: () => {this.toastr.success("Customer updated", "Success!"), this.router.navigateByUrl("/customers")},
        error: () => this.toastr.error("Failed to update customer", "Warning!")
      })
  }

  DeleteCustomer(id: number)
  {
    this.customerService.DeleteCustomer(id).subscribe(
      {
        next: () => {this.toastr.success("Customer deleted", "Success!"), this.router.navigateByUrl("/customers")},
        error: () => this.toastr.error("Failed to delete customer", "Warning!")
      })
  }


}
