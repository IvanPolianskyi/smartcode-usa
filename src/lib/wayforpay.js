import crypto from 'crypto'

const MERCHANT_ACCOUNT = process.env.WAYFORPAY_MERCHANT_ACCOUNT || ''
const MERCHANT_SECRET = process.env.WAYFORPAY_MERCHANT_SECRET || ''
const MERCHANT_DOMAIN = process.env.WAYFORPAY_MERCHANT_DOMAIN || process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, '') || 'smartcode.academy'
const API_URL = 'https://api.wayforpay.com/api'

function hmacMd5(data) {
  return crypto.createHmac('md5', MERCHANT_SECRET).update(data, 'utf8').digest('hex')
}

function buildProductSignatureFields(productName, productCount, productPrice) {
  const parts = []
  productName.forEach((n) => parts.push(n))
  productCount.forEach((c) => parts.push(String(c)))
  productPrice.forEach((p) => parts.push(String(p)))
  return parts.join(';')
}

export function buildCreateInvoiceSignature({
  merchantAccount,
  merchantDomainName,
  orderReference,
  orderDate,
  amount,
  currency,
  productName,
  productCount,
  productPrice,
}) {
  const line = [
    merchantAccount,
    merchantDomainName,
    orderReference,
    orderDate,
    amount,
    currency,
    buildProductSignatureFields(productName, productCount, productPrice),
  ].join(';')
  return hmacMd5(line)
}

export function buildWebhookSignature({
  merchantAccount,
  orderReference,
  amount,
  currency,
  authCode,
  cardPan,
  transactionStatus,
  reasonCode,
}) {
  const line = [
    merchantAccount,
    orderReference,
    amount,
    currency,
    authCode || '',
    cardPan || '',
    transactionStatus || '',
    reasonCode || '',
  ].join(';')
  return hmacMd5(line)
}

export function buildWebhookResponseSignature(orderReference, status, time) {
  return hmacMd5([orderReference, status, time].join(';'))
}

/**
 * Create WayForPay invoice and return payment URL (supports card, Apple Pay, Google Pay)
 */
export async function createInvoice({
  orderReference,
  amount,
  currency = 'USD',
  productName,
  productPrice,
  productCount = [1],
  language = 'EN',
  serviceUrl,
  clientEmail,
  clientFirstName,
  clientLastName,
  paymentSystems = 'card;googlePay;applePay',
}) {
  if (!MERCHANT_ACCOUNT || !MERCHANT_SECRET) {
    throw new Error('WayForPay keys are not configured')
  }

  const orderDate = Math.floor(Date.now() / 1000)
  const names = Array.isArray(productName) ? productName : [productName]
  const prices = Array.isArray(productPrice) ? productPrice : [productPrice]
  const counts = Array.isArray(productCount) ? productCount : [productCount]

  const payload = {
    transactionType: 'CREATE_INVOICE',
    merchantAccount: MERCHANT_ACCOUNT,
    merchantAuthType: 'SimpleSignature',
    merchantDomainName: MERCHANT_DOMAIN,
    apiVersion: 1,
    language,
    serviceUrl,
    orderReference,
    orderDate,
    amount: Number(amount).toFixed(2),
    currency,
    productName: names,
    productPrice: prices.map((p) => String(p)),
    productCount: counts.map((c) => String(c)),
    paymentSystems,
    clientEmail: clientEmail || undefined,
    clientFirstName: clientFirstName || undefined,
    clientLastName: clientLastName || undefined,
  }

  payload.merchantSignature = buildCreateInvoiceSignature({
    merchantAccount: payload.merchantAccount,
    merchantDomainName: payload.merchantDomainName,
    orderReference: payload.orderReference,
    orderDate: payload.orderDate,
    amount: payload.amount,
    currency: payload.currency,
    productName: names,
    productCount: counts,
    productPrice: prices,
  })

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await response.json()
  if (!data.invoiceUrl) {
    throw new Error(data.reason || data.reasonCode || 'WayForPay invoice creation failed')
  }

  return {
    invoiceUrl: data.invoiceUrl,
    reasonCode: data.reasonCode,
  }
}

export function verifyWebhookSignature(body) {
  if (!MERCHANT_ACCOUNT || !MERCHANT_SECRET) return false
  if (!body?.merchantAccount || body.merchantAccount !== MERCHANT_ACCOUNT) return false

  const expected = buildWebhookSignature({
    merchantAccount: body.merchantAccount,
    orderReference: body.orderReference,
    amount: body.amount,
    currency: body.currency,
    authCode: body.authCode,
    cardPan: body.cardPan,
    transactionStatus: body.transactionStatus,
    reasonCode: body.reasonCode,
  })
  return expected === body.merchantSignature
}
