import { Receipt } from "./Receipt"

export interface ReceiptHistory
{
    totalTransactions: number
    totalNetSales: number
    totalDiscounts: number
    totalSales: number
    cashSales: number
    cardSales: number
    receipts: Receipt[]
}