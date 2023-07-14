import { NewReceiptItem } from "../receipt-items/NewReceiptItem"
import { ReceiptItem } from "../receipt-items/ReceiptItem"

export interface NewReceipt
{
    Number: number
    Note: string
    CustomerName: string
    ReceiptItems: NewReceiptItem[]
}