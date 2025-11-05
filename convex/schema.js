"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("convex/server");
var values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    cart: (0, server_1.defineTable)({
        sessionId: values_1.v.string(),
        items: values_1.v.array(values_1.v.object({
            productId: values_1.v.string(),
            name: values_1.v.string(),
            price: values_1.v.number(),
            quantity: values_1.v.number(),
            image: values_1.v.string(),
        })),
    }).index("by_session", ["sessionId"]),
    orders: (0, server_1.defineTable)({
        email: values_1.v.string(),
        name: values_1.v.string(),
        phone: values_1.v.string(),
        address: values_1.v.string(),
        zip: values_1.v.string(),
        city: values_1.v.string(),
        country: values_1.v.string(),
        paymentMethod: values_1.v.union(values_1.v.literal("e-Money"), values_1.v.literal("Cash on Delivery")),
        eMoneyNumber: values_1.v.optional(values_1.v.string()),
        eMoneyPin: values_1.v.optional(values_1.v.string()),
        items: values_1.v.array(values_1.v.object({
            id: values_1.v.string(),
            name: values_1.v.string(),
            price: values_1.v.number(),
            quantity: values_1.v.number(),
        })),
        total: values_1.v.number(),
        grandTotal: values_1.v.number(),
        status: values_1.v.union(values_1.v.literal("pending"), values_1.v.literal("shipped"), values_1.v.literal("confirmed"), values_1.v.literal("delivered")),
        createdAt: values_1.v.number(),
    }).index("by_email", ["email"]),
});
