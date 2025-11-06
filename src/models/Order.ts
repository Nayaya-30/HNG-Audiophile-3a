interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Order {
  _id?: string
  id?: string
  createdAt?: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  zip: string
  country: string
  paymentMethod: string
  grandTotal: number
  items: OrderItem[]
}

export default Order