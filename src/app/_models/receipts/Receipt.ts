import { Customer } from "../customers/Customer"
import { ReceiptItem } from "../receipt-items/ReceiptItem"
import { Employee } from "../users/Employee"
import { User } from "../users/User"

export interface Receipt
{
    id: number
    number: number
    note: string
    customer: Customer
    employee: Employee
    receiptItems: ReceiptItem[]
    date: Date
}