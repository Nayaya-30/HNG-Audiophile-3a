// convex/createOrder.ts
import { mutation } from "./_generated/server"
import { v } from "convex/values"
import sendEmail from "./sendEmail"

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
    // Insert order into database
    const orderId = await ctx.db.insert("orders", {
      ...args,
      createdAt: Date.now(),
      status: "confirmed",
    })
    
    // Create full order object with ID for email processing
    const fullOrder = { 
      ...args, 
      _id: orderId, 
      createdAt: Date.now()
    };
    
    // Send confirmation email
    const emailResult = await sendEmail(ctx, { order: fullOrder })
    
    if (!emailResult.success) {
      console.error(`Failed to send email: ${emailResult.error}`)
      // Consider if you want to roll back the order creation in this case
      // You could update the order status to 'email_failed' for follow-up
      await ctx.db.patch(orderId, {
        status: `confirmed_email_failed: ${emailResult.error}`
      });
    }
    
    return fullOrder;
  },
})