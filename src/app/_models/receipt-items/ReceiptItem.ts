import { Product } from "../products/Product";

export interface ReceiptItem
{
    product: Product
    quantity: number
    price: number
    discountPercentage: number
    discountAmmount: number
    totalPrice: number
}