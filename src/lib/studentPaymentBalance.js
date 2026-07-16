/**
 * Баланс уроків: для CRM-linked учнів — як у CRM (ledger),
 * debt = abs(min(0, prepaid)); для локальних — евристика до привʼязки.
 */

/**
 * @param {number} prepaidLessonsRemaining — баланс (може бути < 0)
 * @returns {number}
 */
export function debtLessonsFromPrepaid(prepaidLessonsRemaining) {
  const prepaid = Number(prepaidLessonsRemaining) || 0
  return Math.abs(Math.min(0, prepaid))
}

/**
 * Локальний fallback для учнів без CRM (немає auto-charge за проведений урок).
 * @param {{ lessonCredits: number, scheduleCount?: number }} args
 */
export function computeLocalDebtLessons({ lessonCredits, scheduleCount = 0 }) {
  const credits = Number(lessonCredits) || 0
  const slots = Math.max(0, Math.floor(Number(scheduleCount) || 0))
  if (slots > 0) {
    return Math.max(0, slots - credits)
  }
  return credits < 1 ? 1 : 0
}

/**
 * Нормалізує відповідь CRM payment-status + локальні прапорці квитанцій.
 * @param {object|null} crm
 * @param {{
 *   localLessonCredits: number,
 *   scheduleCount?: number,
 *   hasPendingReceiptReview?: boolean,
 *   hasRejectedReceipt?: boolean,
 * }} local
 */
export function resolveStudentPaymentBalance(crm, local) {
  const localCredits = Number(local?.localLessonCredits) || 0
  const scheduleCount = Number(local?.scheduleCount) || 0
  const localPending = Boolean(local?.hasPendingReceiptReview)
  const localRejected = Boolean(local?.hasRejectedReceipt)

  if (crm && typeof crm === 'object' && crm.prepaid_lessons_remaining != null) {
    const prepaid = Number(crm.prepaid_lessons_remaining) || 0
    const debtLessons = Math.max(
      0,
      Number(crm.debt_lessons != null ? crm.debt_lessons : debtLessonsFromPrepaid(prepaid)) || 0
    )
    const hasPendingReceipt =
      Boolean(crm.has_pending_receipt) || localPending
    const hasDebt = debtLessons > 0
    const shouldRequestPayment =
      crm.should_request_payment != null
        ? Boolean(crm.should_request_payment) && !localPending
        : hasDebt && !hasPendingReceipt

    return {
      balanceSource: 'crm',
      lessonCredits: prepaid,
      debtLessons,
      hasDebt,
      shouldRequestPayment,
      hasPendingReceiptReview: hasPendingReceipt,
      hasRejectedReceipt: localRejected,
      debtItems: Array.isArray(crm.debt_items) ? crm.debt_items : [],
      pendingReceiptsCount: Number(crm.pending_receipts_count || 0),
    }
  }

  const debtLessons = computeLocalDebtLessons({
    lessonCredits: localCredits,
    scheduleCount,
  })
  const hasDebt = debtLessons > 0 && !localPending
  return {
    balanceSource: 'local',
    lessonCredits: localCredits,
    debtLessons,
    hasDebt,
    shouldRequestPayment: hasDebt,
    hasPendingReceiptReview: localPending,
    hasRejectedReceipt: localRejected,
    debtItems: [],
    pendingReceiptsCount: 0,
  }
}
