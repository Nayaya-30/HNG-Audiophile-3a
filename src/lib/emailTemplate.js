"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.generateEmailHTML = void 0
// src/lib/emailTemplate.ts
var generateEmailHTML = function (order) {
  return "\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <title>Order Confirmed!</title>\n  <style>\n    body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }\n    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }\n    .header { background: #D87D4A; color: white; padding: 30px; text-align: center; }\n    .content { padding: 30px; }\n    .item { border-bottom: 1px solid #eee; padding: 15px 0; }\n    .total { font-size: 1.5em; font-weight: bold; color: #D87D4A; }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <div class=\"header\">\n      <h1>Thank You, "
    .concat(
      order.name,
      "!</h1>\n      <p>Your order is confirmed</p>\n    </div>\n    <div class=\"content\">\n      <p>Order ID: <strong>#",
    )
    .concat(
      order._id.slice(-6),
      "</strong></p>\n      <h3>Shipping To:</h3>\n      <p>",
    )
    .concat(order.address, "<br>")
    .concat(order.city, ", ")
    .concat(order.zip, "<br>")
    .concat(order.country, "</p>\n      \n      <h3>Items:</h3>\n      ")
    .concat(
      order.items
        .map(function (item) {
          return "\n        <div class=\"item\">\n          <strong>"
            .concat(item.name, "</strong> × ")
            .concat(item.quantity, "<br>\n          <span>$")
            .concat(
              (item.price * item.quantity).toFixed(2),
              "</span>\n        </div>\n      ",
            )
        })
        .join(""),
      "\n      \n      <div class=\"total\">\n        Grand Total: $",
    )
    .concat(
      order.grandTotal.toFixed(2),
      "\n      </div>\n      \n      <p style=\"margin-top: 30px; color: #666;\">
        We’ll email you when your order ships. Questions? Reply to this email.
      </p>
    </div>
  </div>
</body>
</html>
",
    )
}
exports.generateEmailHTML = generateEmailHTML