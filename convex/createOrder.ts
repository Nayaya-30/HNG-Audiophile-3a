// convex/createOrder.ts
import { mutation } from './_generated/server'
import { v } from 'convex/values'

export default mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    zip: v.string(),
    city: v.string(),
    country: v.string(),
    paymentMethod: v.union(v.literal('e-Money'), v.literal('Cash on Delivery')),
    eMoneyNumber: v.optional(v.string()),
    eMoneyPin: v.optional(v.string()),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    total: v.number(),
    grandTotal: v.number(),
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert('orders', {
      ...args,
      createdAt: Date.now(),
      status: 'confirmed',
    })
    
    // Return the full order with ID for email processing
    const fullOrder = { ...args, _id: orderId, createdAt: Date.now() };
    return fullOrder;
  },
})