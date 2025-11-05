import { Resend } from 'resend'
import OrderConfirmation from 'components/emails/OrderConfirmation'
import ShippingUpdate from 'components/emails/ShippingUpdate'
import ThankYou from 'components/emails/ThankYou'

// Check if API key exists
const apiKey = process.env.RESEND_API_KEY
let resend: Resend | null = null

if (apiKey) {
  resend = new Resend(apiKey)
} else {
  console.warn('Resend API key not found. Email sending will be disabled.')
}

export async function sendOrderEmails(order: any) {
  // If Resend is not configured, skip email sending
  if (!resend) {
    console.warn('Resend not configured. Skipping email sending.')
    return
  }

  try {
    const orderData = { ...order, id: order._id }

    // 1. Immediate - Order confirmation
    await resend.emails.send({
      from: 'Audiophile <orders@audiophile.com>',
      to: order.email,
      subject: 'Order Confirmed!',
      react: OrderConfirmation({ order: orderData }),
    })

    // 2. After 5 minutes - Shipping notification
    setTimeout(
      async () => {
        await resend.emails.send({
          from: 'Audiophile <shipping@audiophile.com>',
          to: order.email,
          subject: 'Your order is on the way!',
          react: ShippingUpdate({ order: orderData }),
        })
      },
      5 * 60 * 1000,
    ) // 5 minutes

    // 3. After 10 minutes - Delivery notification with thank you
    setTimeout(
      async () => {
        await resend.emails.send({
          from: 'Audiophile <hello@audiophile.com>',
          to: order.email,
          subject: 'Thank you for shopping with Audiophile!',
          react: ThankYou({ order: orderData }),
        })
      },
      10 * 60 * 1000,
    ) // 10 minutes
  } catch (error) {
    console.error('Error sending emails:', error)
  }
}
