import { ReceiptItem } from "../receipt-items/ReceiptItem"

export interface Receipt
{
    Number: number
    Note: string
    CustomerName: string
    ReceiptItems: ReceiptItem[]
}