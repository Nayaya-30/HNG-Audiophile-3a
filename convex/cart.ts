// convex/cart.ts
import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const addItem = mutation({
  args: {
    sessionId: v.string(),
    item: v.object({
      productId: v.string(),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),   // ADD THIS
      image: v.string(),
    }),
  },
  handler: async (ctx, { sessionId, item }) => {
    const existing = await ctx.db
      .query('cart')
      .withIndex('by_session', q => q.eq('sessionId', sessionId))
      .first()

    if (existing) {
      const updatedItems = [...existing.items, item]
      await ctx.db.patch(existing._id, { items: updatedItems })
    } else {
      await ctx.db.insert('cart', {
        sessionId,
        items: [item],
      })
    }
  },
})