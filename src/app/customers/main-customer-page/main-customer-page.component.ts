import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/_models/customers/Customer';
import { EditedCustomer } from 'src/app/_models/customers/EditedCustomer';
import { NewCustomer } from 'src/app/_models/customers/NewCustomer';
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
  newCustomer: NewCustomer = {Name: "", Address: "", Town: ""}

  editedCustomer: EditedCustomer = {Id: 0, Name: "", Address: "", Town: ""}

  isUpdatingCustomer: boolean = false

  CreateCustomer()
  {
    this.customerService.CreateCustomer(this.newCustomer).subscribe(
      {
        next: () => {this.toastr.success("New customer created", "Success!"), this.GetCustomers()
        this.newCustomer = {Name: "", Address: "", Town: ""}
      },
        error: () => this.toastr.error("Failed to create new customer", "Warning!")
      })
  }

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

  StartCustomerUpdating(customer: Customer)
  {
    this.isUpdatingCustomer = true
    this.editedCustomer = 
    {
      Id: customer.id,
      Name: customer.name,
      Address: customer.address,
      Town: customer.town
    }   
  }

  UpdateCustomer()
  {
    this.customerService.UpdateCustomer(this.editedCustomer).subscribe(
      {
        next: () => {this.toastr.success("Customer updated", "Success!"), this.GetCustomers(), this.StopCustomerEditing()},
        error: () => this.toastr.error("Failed to update customer", "Warning!")
      })
  }

  DeleteCustomer()
  {
    this.customerService.DeleteCustomer(this.editedCustomer.Id).subscribe(
      {
        next: () => {this.toastr.success("Customer deleted", "Success!"), this.GetCustomers(), this.StopCustomerEditing()},
        error: () => this.toastr.error("Failed to delete customer", "Warning!")
      })
  }

  StopCustomerEditing()
  {
    this.editedCustomer = {Id: 0, Name: "", Address: "", Town: ""}, this.isUpdatingCustomer = false
  }

}
