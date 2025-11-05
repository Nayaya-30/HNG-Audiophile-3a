import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cart: defineTable({
    sessionId: v.string(),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
  }).index("by_session", ["sessionId"]),

  orders: defineTable({
    email: v.string(),
    name: v.string(),
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
    status: v.union(v.literal("pending"), v.literal("shipped"), v.literal("confirmed"), v.literal("delivered")),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});