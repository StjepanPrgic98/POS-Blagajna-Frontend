import { Customer } from "../customers/Customer"
import { ReceiptItem } from "../receipt-items/ReceiptItem"

export interface Receipt
{
    id: number
    number: number
    note: string
    customer: Customer
    receiptItems: ReceiptItem[]
    date: Date
}