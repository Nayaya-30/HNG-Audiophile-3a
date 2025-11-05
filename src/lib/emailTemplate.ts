// src/lib/emailTemplate.ts
export const generateEmailHTML = (order: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Confirmation - Audiophile</title>
  <style>
    body { 
      font-family: "Manrope", Arial, sans-serif; 
      background: #f4f4f4; 
      padding: 20px;
      color: #000000;
      margin: 0;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white; 
      border-radius: 8px; 
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    .header { 
      background: #D87D4A; 
      color: white; 
      padding: 30px; 
      text-align: center;
    }
    .header h1 { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px; }
    .header p { margin: 10px 0 0; font-size: 18px; opacity: 0.9; }
    .logo { max-width: 150px; margin: 0 auto 20px; }
    .content { padding: 30px; }
    .order-details { background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .detail-row { display: flex; margin-bottom: 10px; }
    .detail-label { font-weight: bold; min-width: 150px; color: #555; }
    .item { border-bottom: 1px solid #eee; padding: 15px 0; }
    .item:last-child { border-bottom: none; }
    .item-name { font-weight: bold; margin-bottom: 5px; }
    .item-details { display: flex; justify-content: space-between; }
    .item-price { color: #D87D4A; font-weight: bold; }
    .totals { margin-top: 30px; }
    .total-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
    .grand-total { font-size: 1.5em; font-weight: bold; color: #D87D4A; border-top: 2px solid #eee; padding-top: 15px; margin-top: 15px; }
    .footer { text-align: center; padding: 20px; background: #000; color: #fff; font-size: 14px; }
    .highlight { color: #D87D4A; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">
        <img src="https://audiophile-ecommerce.vercel.app/assets/shared/desktop/logo.svg" alt="Audiophile" width="150">
      </div>
      <h1>ORDER CONFIRMED</h1>
      <p>Thank you for your purchase, ${order.name}!</p>
    </div>
    
    <div class="content">
      <div class="order-details">
        <div class="detail-row">
          <div class="detail-label">Order Number:</div>
          <div>#${order._id?.slice(-8).toUpperCase() || "TEMP"}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Order Date:</div>
          <div>${new Date(order.createdAt || Date.now()).toLocaleDateString()}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Payment Method:</div>
          <div>${order.paymentMethod || "Not specified"}</div>
        </div>
      </div>
      
      <h3>Shipping Information</h3>
      <div class="order-details">
        <div><strong>${order.name}</strong></div>
        <div>${order.address}</div>
        <div>${order.city}, ${order.zip}</div>
        <div>${order.country}</div>
        <div>Email: ${order.email}</div>
        <div>Phone: ${order.phone}</div>
      </div>
      
      <h3>Order Items</h3>
      ${order.items.map((item: any) => `
        <div class="item">
          <div class="item-name">${item.name}</div>
          <div class="item-details">
            <div>${item.quantity} × $${item.price.toFixed(2)}</div>
            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        </div>
      `).join("")}
      
      <div class="totals">
        <div class="total-row">
          <div>Subtotal:</div>
          <div>$${(order.grandTotal - 50).toFixed(2)}</div>
        </div>
        <div class="total-row">
          <div>Shipping:</div>
          <div>$50.00</div>
        </div>
        <div class="total-row grand-total">
          <div>GRAND TOTAL:</div>
          <div>$${order.grandTotal.toFixed(2)}</div>
        </div>
      </div>
      
      <p style="margin-top: 30px; color: #666; text-align: center;">
        A confirmation has been sent to <span class="highlight">${order.email}</span>.<br>
        We'll email you when your order ships.<br>
        Questions? Just reply to this email.
      </p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} Audiophile. All rights reserved.</p>
      <p>High quality audio for music lovers</p>
    </div>
  </div>
</body>
</html>
`.trim()