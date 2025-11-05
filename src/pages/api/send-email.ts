// src/pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

// Create reusable transporter
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	const { to, name, orderItems, grandTotal } = req.body

	// Safety check
	if (!to || !name || !orderItems) {
		return res.status(400).json({ error: "Missing data" })
	}

	const itemsHtml = orderItems
		.map(
			(item: any) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong> × ${item.quantity}
        </td>
        <td align="right" style="padding: 12px 0; border-bottom: 1px solid #eee;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `
		)
		.join("")

	const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Order Confirmed</title>
      <style>
        body { font-family: "Helvetica Neue", Arial, sans-serif; background: #f6f6f6; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { background: #D87D4A; color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { padding: 40px 30px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .total { font-size: 24px; font-weight: bold; color: #D87D4A; text-align: right; margin-top: 20px; }
        .footer { background: #141414; color: #aaa; padding: 30px; text-align: center; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You, ${name}!</h1>
          <p>Your order is confirmed</p>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>We’re excited to let you know your order has been received and is being processed.</p>
          
          <h3>Your Items</h3>
          <table>${itemsHtml}</table>
          
          <div class="total">
            Grand Total: $${grandTotal.toFixed(2)}
          </div>
          
          <p style="margin-top: 30px; color: #666;">
            You’ll receive another email when your order ships. Questions? Just reply.
          </p>
        </div>
        <div class="footer">
          <p>Audiophile • High-end audio gear • <a href="https://audiophile-ecommerce.vercel.app" style="color: #D87D4A;">Visit Store</a></p>
        </div>
      </div>
    </body>
    </html>
  `

	try {
		await transporter.sendMail({
			from: "\"Audiophile\" <noreply@audiophile.com>",
			to,
			subject: `Order Confirmed, ${name}!`,
			html,
		})

		res.status(200).json({ success: true })
	} catch (error) {
		console.error('Email error:', error)
		res.status(500).json({ error: "Failed to send email" })
	}
}