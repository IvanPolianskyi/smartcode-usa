/**
 * Subscription lifecycle events the webhook acts on.
 *
 * Kept in its own dependency-free module so the Paddle preflight script can
 * import the same list and verify the notification destination in Paddle is
 * subscribed to every one of them. A missing event type here is silent: the
 * customer pays, nothing arrives, and nobody gets access.
 */
export const SUBSCRIPTION_EVENT_TYPES = [
	'subscription.created',
	'subscription.activated',
	'subscription.updated',
	'subscription.trialing',
	'subscription.past_due',
	'subscription.paused',
	'subscription.resumed',
	'subscription.canceled',
]

/** One-time purchases (kits). Subscription renewals also fire this; non-kit ones are ignored. */
export const TRANSACTION_EVENT_TYPES = ['transaction.completed']

/** Everything the webhook destination must be subscribed to. */
export const WEBHOOK_EVENT_TYPES = [...SUBSCRIPTION_EVENT_TYPES, ...TRANSACTION_EVENT_TYPES]

/** Path Paddle should POST to. */
export const WEBHOOK_PATH = '/api/billing/webhook'
