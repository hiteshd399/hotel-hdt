import * as brevoPkg from '@getbrevo/brevo'
import dotenv from 'dotenv'

dotenv.config()

// Debug: log the actual shape of the package so we can see what's available
console.log('[BREVO DEBUG] top-level keys:', Object.keys(brevoPkg))
console.log('[BREVO DEBUG] has default?', 'default' in brevoPkg)
if (brevoPkg.default) {
  console.log('[BREVO DEBUG] default keys:', Object.keys(brevoPkg.default))
}

// Try to locate TransactionalEmailsApi wherever it actually lives
const TransactionalEmailsApi =
  brevoPkg.TransactionalEmailsApi ||
  brevoPkg.default?.TransactionalEmailsApi

const TransactionalEmailsApiApiKeys =
  brevoPkg.TransactionalEmailsApiApiKeys ||
  brevoPkg.default?.TransactionalEmailsApiApiKeys

if (!TransactionalEmailsApi) {
  console.error('[BREVO DEBUG] Could not find TransactionalEmailsApi anywhere in the module')
}

const apiInstance = new TransactionalEmailsApi()
apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

/**
 * Send an email using Brevo.
 * @param {Object} opts { to, subject, html, text }
 */
export async function sendEmail({ to, subject, html, text }) {
  try {
    const info = await apiInstance.sendTransacEmail({
      sender: { name: 'Hotel HDT', email: 'hiteshdeuba@gmail.com' },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: text || subject,
    })
    console.log(`[EMAIL] Sent to ${to}: ${info.body?.messageId}`)
    return info
  } catch (err) {
    console.error('[EMAIL ERROR]', err.message)
    throw err
  }
}

/**
 * Send booking confirmation email to customer.
 */
export async function sendBookingConfirmationEmail({ to, booking, room }) {
  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #0E0E0E; color: #FFFFFF; border-radius: 12px;">
      <h1 style="color: #C9A227; text-align: center; letter-spacing: 1px;">Hotel HDT</h1>
      <p style="font-size: 16px; color: #D4AF37;">Booking Confirmation</p>
      <p>Dear Guest,</p>
      <p>Thank you for booking with Hotel HDT. Your reservation has been received and is pending admin approval.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px; color: #999;">Room</td><td style="padding: 8px; color: #FFF;">${room.name}</td></tr>
        <tr><td style="padding: 8px; color: #999;">Check-in</td><td style="padding: 8px; color: #FFF;">${new Date(booking.checkIn).toDateString()}</td></tr>
        <tr><td style="padding: 8px; color: #999;">Check-out</td><td style="padding: 8px; color: #FFF;">${new Date(booking.checkOut).toDateString()}</td></tr>
        <tr><td style="padding: 8px; color: #999;">Guests</td><td style="padding: 8px; color: #FFF;">${booking.adults} Adults, ${booking.children} Children</td></tr>
        <tr><td style="padding: 8px; color: #999;">Nights</td><td style="padding: 8px; color: #FFF;">${booking.nights}</td></tr>
        <tr><td style="padding: 8px; color: #999;">Total Price</td><td style="padding: 8px; color: #C9A227; font-weight: bold;">$${booking.totalPrice}</td></tr>
      </table>
      <p>We look forward to welcoming you to Kathmandu.</p>
      <p style="margin-top: 32px; color: #999; font-size: 12px;">Hotel HDT, Kathmandu, Nepal • info@hotelhdt.com • +977-98XXXXXXXX</p>
    </div>
  `
  return sendEmail({
    to,
    subject: `Booking Confirmation - ${room.name} | Hotel HDT`,
    html,
  })
}

/**
 * Send booking status update email.
 */
export async function sendBookingStatusEmail({ to, booking, room, status }) {
  const statusMap = {
    approved: { color: '#22C55E', label: 'APPROVED' },
    cancelled: { color: '#EF4444', label: 'CANCELLED' },
    completed: { color: '#C9A227', label: 'COMPLETED' },
  }
  const { color, label } = statusMap[status] || { color: '#999', label: status.toUpperCase() }
  const html = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #0E0E0E; color: #FFFFFF; border-radius: 12px;">
      <h1 style="color: #C9A227; text-align: center; letter-spacing: 1px;">Hotel HDT</h1>
      <p style="text-align: center; font-size: 18px; color: ${color}; font-weight: bold; letter-spacing: 2px;">${label}</p>
      <p>Dear Guest,</p>
      <p>Your booking for <strong style="color: #D4AF37;">${room.name}</strong> has been <strong style="color: ${color};">${label.toLowerCase()}</strong>.</p>
      <p style="margin-top: 16px;">Check-in: ${new Date(booking.checkIn).toDateString()}<br/>Check-out: ${new Date(booking.checkOut).toDateString()}</p>
      <p style="margin-top: 32px; color: #999; font-size: 12px;">Hotel HDT, Kathmandu, Nepal • info@hotelhdt.com</p>
    </div>
  `
  return sendEmail({
    to,
    subject: `Booking ${label} - ${room.name} | Hotel HDT`,
    html,
  })
}