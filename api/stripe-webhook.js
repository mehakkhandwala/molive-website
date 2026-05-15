import Stripe from 'stripe'
import { google } from 'googleapis'

export const config = { api: { bodyParser: false } }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const rawBody = await getRawBody(req)
  const sig     = req.headers['stripe-signature']
  const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: `Webhook error: ${err.message}` })
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true })
  }

  const session  = event.data.object
  const meta     = session.metadata || {}
  const customer = session.customer_details || {}

  // Format timestamp
  const now = new Date()
  const timestamp = now.toLocaleString('en-US', { timeZone: 'America/Chicago' })

  // Format items from metadata isn't available — use amount_total
  const total = session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : 'N/A'

  // Append row to Google Sheet
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key:   process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          timestamp,
          meta.customer_name  || customer.name  || 'N/A',
          customer.email      || 'N/A',
          meta.customer_phone || 'N/A',
          meta.pickup_date    || 'N/A',
          meta.pickup_time    || 'N/A',
          session.id,
          total,
        ]],
      },
    })

    console.log('Order logged to Google Sheets:', session.id)
  } catch (err) {
    console.error('Google Sheets error:', err.message)
    // Still return 200 so Stripe doesn't retry — the payment succeeded
    return res.status(200).json({ received: true, sheetsError: err.message })
  }

  return res.status(200).json({ received: true })
}
