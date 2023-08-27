import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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

  constructor(private customerService: CustomerService, private toastr: ToastrService, private modalService: BsModalService){}

  customers: Customer[] | undefined
  
  customerName: string = ""
  newCustomer: NewCustomer = {Name: "", Address: "", Town: ""}

  editedCustomer: EditedCustomer = {Id: 0, Name: "", Address: "", Town: ""}

  isUpdatingCustomer: boolean = false

  abortCreatingCustomer: boolean = false
  abortEditingCustomer: boolean = false

  modalRef?: BsModalRef;
  message?: string;

  CreateCustomer()
  {
    this.ValidateNewCustomer();

    if(this.abortCreatingCustomer){return;}

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
    this.ValidateEditedCustomer();

    if(this.abortEditingCustomer){return;}
    
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

  ValidateNewCustomer()
  {
    this.abortCreatingCustomer = false
    if(this.newCustomer.Name == "" || this.newCustomer.Name == null || this.newCustomer.Name == undefined){this.abortCreatingCustomer = true; this.toastr.error("Enter customer name!", "Warning!")}
    if(this.newCustomer.Address == "" || this.newCustomer.Address == null || this.newCustomer.Address == undefined){this.abortCreatingCustomer = true; this.toastr.error("Enter customer address!", "Warning!")}
    if(this.newCustomer.Town == "" || this.newCustomer.Town == null || this.newCustomer.Town == undefined){this.abortCreatingCustomer = true; this.toastr.error("Enter customer town!", "Warning!")}
  }

  ValidateEditedCustomer()
  {
    this.abortEditingCustomer = false
    if(this.editedCustomer.Name == "" || this.editedCustomer.Name == null || this.editedCustomer.Name == undefined){this.abortEditingCustomer = true; this.toastr.error("Enter customer name!", "Warning!")}
    if(this.editedCustomer.Address == "" || this.editedCustomer.Address == null || this.editedCustomer.Address == undefined){this.abortEditingCustomer = true; this.toastr.error("Enter customer address!", "Warning!")}
    if(this.editedCustomer.Town == "" || this.editedCustomer.Town == null || this.editedCustomer.Town == undefined){this.abortEditingCustomer = true; this.toastr.error("Enter customer town!", "Warning!")}
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }
}
