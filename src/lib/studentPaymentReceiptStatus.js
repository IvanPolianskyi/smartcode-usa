function isReceiptUpload(payment) {
  return payment?.paymentMethod === 'receipt_upload'
}

export function isPendingReceiptReview(payment) {
  if (!isReceiptUpload(payment)) return false
  if (payment.approvalStatus === 'approved' || payment.approvalStatus === 'rejected') {
    return false
  }
  if (payment.status === 'completed' || payment.status === 'failed') {
    return false
  }
  return payment.status === 'pending' || payment.approvalStatus === 'pending' || !payment.approvalStatus
}

export function isRejectedReceiptUpload(payment) {
  if (!isReceiptUpload(payment)) return false
  return payment.approvalStatus === 'rejected' || payment.status === 'failed'
}

/** @param {Array<{ paymentMethod?: string, status?: string, approvalStatus?: string, createdAt?: Date | string }>} payments */
export function getStudentReceiptReviewState(payments) {
  const receipts = (payments || []).filter(isReceiptUpload)
  const sorted = [...receipts].sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  )

  const latest = sorted[0]
  const hasPendingReceiptReview = sorted.some(isPendingReceiptReview)
  const hasRejectedReceipt =
    Boolean(latest) &&
    isRejectedReceiptUpload(latest) &&
    !hasPendingReceiptReview

  return {
    hasPendingReceiptReview,
    hasRejectedReceipt,
    pendingReceiptUploadCount: sorted.filter(isPendingReceiptReview).length,
  }
}
