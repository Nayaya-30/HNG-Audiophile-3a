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
    paymentMethod: v.union(v.literal("e-Money"), v.literal("Cash on Delivery")),
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
    const order = {
      ...args,
      status: "pending" as const,
      createdAt: Date.now(),
    };
    
    const orderId = await ctx.db.insert("orders", order);
    return orderId;
  },
})