/**
 * Lightweight node tests for studentPaymentBalance (CRM-aligned formulas).
 * Run: node --test src/lib/studentPaymentBalance.test.mjs
 */
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  debtLessonsFromPrepaid,
  computeLocalDebtLessons,
  resolveStudentPaymentBalance,
} from './studentPaymentBalance.js'

describe('debtLessonsFromPrepaid', () => {
  it('matches CRM abs(min(0, prepaid))', () => {
    assert.equal(debtLessonsFromPrepaid(5), 0)
    assert.equal(debtLessonsFromPrepaid(0), 0)
    assert.equal(debtLessonsFromPrepaid(-3), 3)
  })
})

describe('computeLocalDebtLessons', () => {
  it('uses schedule minus credits when schedule exists', () => {
    assert.equal(computeLocalDebtLessons({ lessonCredits: 1, scheduleCount: 3 }), 2)
  })
  it('requests at least one when no schedule and no credits', () => {
    assert.equal(computeLocalDebtLessons({ lessonCredits: 0, scheduleCount: 0 }), 1)
  })
})

describe('resolveStudentPaymentBalance', () => {
  it('prefers CRM ledger over local heuristic', () => {
    const out = resolveStudentPaymentBalance(
      {
        prepaid_lessons_remaining: -2,
        debt_lessons: 2,
        has_debt: true,
        should_request_payment: true,
        has_pending_receipt: false,
        pending_receipts_count: 0,
        debt_items: [{ lesson_id: '1', date_label: '01.01.2026', time: '10:00', kind: 'ІУ' }],
      },
      {
        localLessonCredits: 99,
        scheduleCount: 1,
        hasPendingReceiptReview: false,
        hasRejectedReceipt: false,
      }
    )
    assert.equal(out.balanceSource, 'crm')
    assert.equal(out.lessonCredits, -2)
    assert.equal(out.debtLessons, 2)
    assert.equal(out.shouldRequestPayment, true)
    assert.equal(out.debtItems.length, 1)
  })

  it('pending local receipt suppresses request even if CRM says request', () => {
    const out = resolveStudentPaymentBalance(
      {
        prepaid_lessons_remaining: -1,
        debt_lessons: 1,
        has_debt: true,
        should_request_payment: true,
        has_pending_receipt: false,
        pending_receipts_count: 0,
      },
      {
        localLessonCredits: 0,
        scheduleCount: 0,
        hasPendingReceiptReview: true,
      }
    )
    assert.equal(out.hasPendingReceiptReview, true)
    assert.equal(out.shouldRequestPayment, false)
  })

  it('falls back to local when CRM missing', () => {
    const out = resolveStudentPaymentBalance(null, {
      localLessonCredits: 0,
      scheduleCount: 2,
      hasPendingReceiptReview: false,
    })
    assert.equal(out.balanceSource, 'local')
    assert.equal(out.debtLessons, 2)
    assert.equal(out.shouldRequestPayment, true)
  })
})
