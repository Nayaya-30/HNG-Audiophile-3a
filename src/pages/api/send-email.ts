// src/pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

interface OrderItem {
  name: string
  price: number
  quantity: number
}

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
	if (req.method !== "POST") return res.status(405).end()

  // THIS LINE FIXES GMAIL ON TERMUX
  await new Promise(r => setTimeout(r, 2000))
  
	// if (req.method !== "POST") {
	//	return res.status(405).json({ error: "Method not allowed" })
	// }

	console.log("PAYLOAD:", req.body)

	const {
		to,
		name,
		orderItems = [],
		grandTotal = 0
	} = req.body

	const total = Number(grandTotal)
	if (!to || !name || !Array.isArray(orderItems) || total <= 0) {
		return res.status(400).json({
			error: "Invalid data",
			to, name, items: orderItems.length, total
		})
	}

	const itemsHtml = orderItems
		.map((item: OrderItem) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong> × ${item.quantity}
        </td>
        <td align="right">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `)
		.join("")

	const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family:Helvetica,Arial,sans-serif;background:#f6f6f6;margin:0;padding:20px">
      <div style="max-width:600px;margin:40px auto;background:white;border-radius:12px;overflow:hidden">
        <div style="background:#D87D4A;color:white;padding:40px;text-align:center">
          <h1>Thank You, ${name}!</h1>
          <p>Your order is confirmed</p>
        </div>
        <div style="padding:40px">
          <h3>Your Items</h3>
          <table style="width:100%;border-collapse:collapse">${itemsHtml}</table>
          <div style="font-size:24px;font-weight:bold;color:#D87D4A;text-align:right;margin-top:20px">
            Grand Total: $${total.toFixed(2)}
          </div>
          <p style="margin-top:30px;color:#666;text-align:center">
            We'll email you when it ships. Questions? Reply to this email.
          </p>
        </div>
        <div style="background:#141414;color:#aaa;padding:30px;text-align:center;font-size:14px">
          <p>Audiophile • <a href="https://audiophile-ecommerce.vercel.app" style="color:#D87D4A">Visit Store</a></p>
        </div>
      </div>
    </body>
    </html>
  `

	try {
		await transporter.sendMail({
			from: '"Audiophile" <noreply@audiophile.com>',
			to,
			subject: `Order Confirmed, ${name}!`,
			html,
		})
		res.status(200).json({ success: true })
	} catch (error: unknown) {
		console.error("EMAIL ERROR:", (error as Error).message)
		res.status(500).json({ error: "Failed to send", details: (error as Error).message })
	}
}