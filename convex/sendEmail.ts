// convex/sendEmail.ts
import { mutation } from './_generated/server'
import { v } from 'convex/values'

export default mutation({
  args: {
    to: v.string(),
    name: v.string(),
    orderItems: v.array(
      v.object({
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
    grandTotal: v.number(),
  },
  handler: async (ctx, args) => {
    // In a real implementation, you would integrate with an email service here
    // For now, we'll just log the email data
    console.log('Sending email to:', args.to);
    console.log('Order details:', args);
    
    // If you want to make an actual HTTP request to your API endpoint:
    /*
    const response = await fetch('https://your-deployment-url.vercel.app/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
    */
    
    return { success: true };
  },
})