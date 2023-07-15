import { Customer } from "../customers/Customer"
import { ReceiptItem } from "../receipt-items/ReceiptItem"

export interface Receipt
{
    number: number
    note: string
    customer: Customer
    receiptItems: ReceiptItem[]
    date: Date
}