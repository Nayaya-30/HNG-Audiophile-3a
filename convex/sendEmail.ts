// convex/sendEmail.ts
import { mutation } from "./_generated/server"
import nodemailer from "nodemailer"
import { generateEmailHTML } from "../src/lib/emailTemplate"
import type { NextApiRequest, NextApiResponse } from "next"

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

	try {
		await transporter.sendMail({
			from: '"Audiophile" <noreply@audiophile.com>',
			to,
			subject: `Order Confirmed, ${name}!`,
			generateEmailHTML,
		})
		res.status(200).json({ success: true })
	} catch (error: unknown) {
		console.error("EMAIL ERROR:", (error as Error).message)
		res.status(500).json({ error: "Failed to send", details: (error as Error).message })
	}
}