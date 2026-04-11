import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { items, pickupDate, pickupTime, customer } = req.body

  if (!items?.length || !pickupDate || !pickupTime || !customer?.email) {
    return res.status(400).json({ error: 'Missing required order fields.' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const line_items = items.map(item => {
    const unitAmount = Math.round(
      parseFloat(String(item.price).replace(/[^0-9.]/g, '')) * 100
    )
    return {
      price_data: {
        currency: 'usd',
        product_data: { name: item.title },
        unit_amount: unitAmount,
      },
      quantity: item.qty,
    }
  })

  const proto  = req.headers['x-forwarded-proto'] || 'https'
  const origin = `${proto}://${req.headers.host}`

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      customer_email: customer.email,
      success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:   `${origin}/?canceled=true#order`,
      metadata: {
        pickup_date:    pickupDate,
        pickup_time:    pickupTime,
        customer_name:  `${customer.firstName} ${customer.lastName}`,
        customer_phone: customer.phone,
      },
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
