import crypto from 'crypto'

/**
 * LiqPay payment utility
 * Documentation: https://www.liqpay.ua/documentation/api
 */

const LIQPAY_PUBLIC_KEY = process.env.LIQPAY_PUBLIC_KEY || ''
const LIQPAY_PRIVATE_KEY = process.env.LIQPAY_PRIVATE_KEY || ''
const LIQPAY_SANDBOX = process.env.LIQPAY_SANDBOX === 'true' || process.env.NODE_ENV !== 'production'

/**
 * Create base64 encoded data for LiqPay
 */
function createData(params) {
  const data = Buffer.from(JSON.stringify(params)).toString('base64')
  return data
}

/**
 * Create signature for LiqPay
 */
function createSignature(data) {
  const signature_string = LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY
  const signature = crypto
    .createHash('sha1')
    .update(signature_string)
    .digest('base64')
  return signature
}

/**
 * Generate payment link for course purchase
 */
export function generatePaymentLink({
  orderId,
  amount,
  description,
  resultUrl,
  serverUrl,
  currency = 'UAH'
}) {
  if (!LIQPAY_PUBLIC_KEY || !LIQPAY_PRIVATE_KEY) {
    throw new Error('LiqPay keys are not configured')
  }

  const params = {
    version: '3',
    public_key: LIQPAY_PUBLIC_KEY,
    action: 'pay',
    amount: amount,
    currency: currency,
    description: description,
    order_id: orderId,
    result_url: resultUrl,
    server_url: serverUrl,
    sandbox: LIQPAY_SANDBOX ? 1 : 0,
    language: 'uk'
  }

  const data = createData(params)
  const signature = createSignature(data)

  return {
    data,
    signature,
    url: 'https://www.liqpay.ua/api/3/checkout'
  }
}

/**
 * Verify LiqPay callback signature
 */
export function verifySignature(data, signature) {
  const expectedSignature = createSignature(data)
  return expectedSignature === signature
}

/**
 * Decode LiqPay data
 */
export function decodeData(data) {
  try {
    const decoded = Buffer.from(data, 'base64').toString('utf-8')
    return JSON.parse(decoded)
  } catch (error) {
    console.error('Error decoding LiqPay data:', error)
    return null
  }
}







