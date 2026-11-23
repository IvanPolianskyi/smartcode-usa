import { Resend } from 'resend'

/**
 * Resend email service with safe fallback for development/sandbox.
 * If RESEND_API_KEY is not configured, emails are safely logged to console.
 */

const resendApiKey = process.env.RESEND_API_KEY || ''
const resendClient = resendApiKey ? new Resend(resendApiKey) : null

const DEFAULT_FROM =
	process.env.EMAIL_FROM ||
	process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
	'SmartCode Academy <support@smartcode.academy>'

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || 'https://smartcode.academy'

/**
 * Base email sending function.
 * @param {{ to: string|string[], subject: string, html: string, text?: string, from?: string }} options
 * @returns {Promise<{ ok: boolean, id?: string, simulated?: boolean, error?: string }>}
 */
export async function sendEmail({ to, subject, html, text, from = DEFAULT_FROM }) {
	const recipients = Array.isArray(to) ? to : [to]
	const cleanTo = recipients.map((r) => String(r).trim()).filter(Boolean)

	if (!cleanTo.length) {
		return { ok: false, error: 'No recipient email specified' }
	}

	if (!resendClient) {
		console.warn('[email] RESEND_API_KEY is not set. Simulating email dispatch:', {
			to: cleanTo,
			from,
			subject,
			preview: text || html.slice(0, 120),
		})
		return { ok: true, simulated: true }
	}

	try {
		const { data, error } = await resendClient.emails.send({
			from,
			to: cleanTo,
			subject,
			html,
			text: text || undefined,
		})

		if (error) {
			console.error('[email] Resend delivery error:', error)
			return { ok: false, error: error.message }
		}

		return { ok: true, id: data?.id }
	} catch (err) {
		console.error('[email] Failed to send email via Resend:', err)
		return { ok: false, error: err?.message || 'Email delivery failed' }
	}
}

/**
 * Modern responsive HTML container for transactional emails.
 */
function emailLayout({ title, previewText, contentHtml }) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${title}</title>
	<!--[if mso]>
	<style type="text/css">
		body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
	</style>
	<![endif]-->
	<style>
		body { margin: 0; padding: 0; background-color: #f6f7fb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; }
		.wrapper { width: 100%; table-layout: fixed; background-color: #f6f7fb; padding: 40px 16px; }
		.container { max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
		.header { padding: 32px 32px 24px; text-align: left; border-bottom: 1px solid #f1f5f9; }
		.brand { font-size: 20px; font-weight: 700; color: #0f172a; text-decoration: none; display: inline-flex; align-items: center; }
		.content { padding: 32px; }
		.h1 { font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 16px; }
		.p { font-size: 15px; color: #475569; margin: 0 0 16px; line-height: 1.6; }
		.btn-wrap { margin: 28px 0; }
		.btn { display: inline-block; background-color: #0f172a; color: #ffffff !important; font-weight: 600; font-size: 15px; text-decoration: none; padding: 12px 28px; border-radius: 8px; text-align: center; }
		.footer { padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #f1f5f9; text-align: center; font-size: 13px; color: #94a3b8; }
		.footer a { color: #64748b; text-decoration: underline; }
		.box { background-color: #f8fafc; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0; margin: 20px 0; }
	</style>
</head>
<body>
	<div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
		${previewText || title}
	</div>
	<table class="wrapper" role="presentation" cellpadding="0" cellspacing="0">
		<tr>
			<td align="center">
				<table class="container" role="presentation" cellpadding="0" cellspacing="0">
					<tr>
						<td class="header">
							<a href="${SITE_URL}" class="brand">SmartCode Academy</a>
						</td>
					</tr>
					<tr>
						<td class="content">
							${contentHtml}
						</td>
					</tr>
					<tr>
						<td class="footer">
							<p style="margin: 0 0 8px;">SmartCode Academy · Building future developers</p>
							<p style="margin: 0;">Have questions? Contact us at <a href="mailto:support@smartcode.academy">support@smartcode.academy</a></p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>`
}

/**
 * Send password reset email.
 */
export async function sendPasswordResetEmail({ to, name, resetUrl }) {
	const displayName = name ? String(name).trim() : 'there'
	const title = 'Reset your SmartCode Academy password'
	const previewText = 'Click the link to reset your account password.'

	const contentHtml = `
		<h1 class="h1">Password Reset Request</h1>
		<p class="p">Hi ${displayName},</p>
		<p class="p">We received a request to reset the password for your SmartCode Academy account. Click the button below to set a new password:</p>
		<div class="btn-wrap">
			<a href="${resetUrl}" class="btn" target="_blank">Reset Password</a>
		</div>
		<p class="p">This link will expire in <strong>1 hour</strong>. If you did not make this request, you can safely ignore this email - your password will remain unchanged.</p>
		<div class="box">
			<p class="p" style="margin: 0; font-size: 13px; word-break: break-all;">
				If the button above does not work, copy and paste this URL into your browser:<br>
				<a href="${resetUrl}" style="color: #2563eb;">${resetUrl}</a>
			</p>
		</div>
	`

	const text = `Hi ${displayName},\n\nWe received a request to reset your SmartCode Academy password. Open this link to set a new password:\n\n${resetUrl}\n\nThis link will expire in 1 hour. If you didn't request this, you can ignore this email.`

	return sendEmail({
		to,
		subject: title,
		html: emailLayout({ title, previewText, contentHtml }),
		text,
	})
}

/**
 * Send welcome email to new students.
 */
export async function sendWelcomeEmail({ to, name, programName, dashboardUrl, discordUrl }) {
	const displayName = name ? String(name).trim() : 'there'
	const title = 'Welcome to SmartCode Academy!'
	const previewText = 'Start coding and building your first project today.'
	const link = dashboardUrl || `${SITE_URL}/dashboard`
	const discord = discordUrl || process.env.NEXT_PUBLIC_DISCORD_INVITE || 'https://discord.gg/rSGUxWyEPt'

	const programText = programName ? ` in the <strong>${programName}</strong> program` : ''

	const contentHtml = `
		<h1 class="h1">Welcome aboard! 🚀</h1>
		<p class="p">Hi ${displayName},</p>
		<p class="p">Your account is ready! We're excited to have you learning with us${programText}.</p>
		<div class="btn-wrap">
			<a href="${link}" class="btn" target="_blank">Open Your Dashboard</a>
		</div>
		<div class="box">
			<h3 style="margin: 0 0 8px; font-size: 15px; color: #0f172a;">What to do next:</h3>
			<ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #475569;">
				<li style="margin-bottom: 6px;"><strong>Jump into Lesson 1:</strong> Start writing code immediately in your browser.</li>
				<li style="margin-bottom: 6px;"><strong>Join the Student Discord:</strong> Connect with teachers and other students <a href="${discord}" style="color: #2563eb;">here</a>.</li>
				<li><strong>Get help anytime:</strong> If you ever get stuck, reach out to support or ask in our community.</li>
			</ul>
		</div>
		<p class="p">Happy coding,<br><strong>Ivan & the SmartCode Team</strong></p>
	`

	const text = `Hi ${displayName},\n\nWelcome to SmartCode Academy!\n\nAccess your dashboard here: ${link}\n\nJoin our student Discord community: ${discord}\n\nHappy coding,\nSmartCode Academy Team`

	return sendEmail({
		to,
		subject: title,
		html: emailLayout({ title, previewText, contentHtml }),
		text,
	})
}

function escapeHtml(value) {
	return String(value || '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

/**
 * Confirmation for a free live build sign-up. With no `event` it is a
 * waitlist confirmation ("we will email you the next date").
 */
export async function sendLiveRegistrationEmail({
	to,
	name,
	event = null,
	joinUrl = '',
	calendarUrl = '',
	icsUrl = '',
	discordUrl = '',
}) {
	const hi = name ? `Hi ${escapeHtml(name)},` : 'Hi,'
	const clubUrl = `${SITE_URL}/club`
	const freeUrl = `${SITE_URL}/free`

	if (!event) {
		const title = "You're on the list for the next live build"
		const contentHtml = `
			<h1 class="h1">You're on the list 🎮</h1>
			<p class="p">${hi}</p>
			<p class="p">The next free live build is being scheduled. We'll email you the date and the link as soon as it's set.</p>
			<p class="p">While you wait, start building in Roblox Studio - free, no card:</p>
			<div class="btn-wrap"><a href="${freeUrl}" class="btn" target="_blank">Start building free</a></div>
			<p class="p">Hang out with other builders in our Discord: <a href="${discordUrl}">${discordUrl}</a></p>
			<p class="p">See you soon,<br><strong>SmartCode</strong></p>
		`
		const text = `${hi}\n\nThe next free live build is being scheduled. We'll email you the date and link.\n\nStart building free: ${freeUrl}\nDiscord: ${discordUrl}\n\nSmartCode`
		return sendEmail({ to, subject: title, html: emailLayout({ title, previewText: 'We will email you the date and link.', contentHtml }), text })
	}

	const when = new Date(event.startsAt).toUTCString().replace(' GMT', ' UTC')
	const title = `You're in: ${event.title}`
	const contentHtml = `
		<h1 class="h1">You're in 🎮</h1>
		<p class="p">${hi}</p>
		<p class="p"><strong>${escapeHtml(event.title)}</strong><br>${when}</p>
		<div class="btn-wrap"><a href="${joinUrl}" class="btn" target="_blank">Join the live build</a></div>
		<div class="box">
			<p style="margin: 0 0 8px; font-size: 14px; color: #475569;">Add it to your calendar so you get a reminder:</p>
			<p style="margin: 0; font-size: 14px;"><a href="${calendarUrl}" style="color: #2563eb;">Google Calendar</a> · <a href="${icsUrl}" style="color: #2563eb;">Apple / Outlook</a></p>
		</div>
		<p class="p">The live build happens in our Discord. Join now so you're ready: <a href="${discordUrl}">${discordUrl}</a></p>
		<p class="p">Want a head start? Start building before we go live - free, no card: <a href="${freeUrl}">${freeUrl}</a></p>
		<p class="p">See you there,<br><strong>SmartCode</strong></p>
		<p class="p" style="font-size: 12px; color: #94a3b8;">Curious about the full course? <a href="${clubUrl}" style="color: #94a3b8;">SmartCode Club</a></p>
	`
	const text = `${hi}\n\nYou're registered: ${event.title}\n${when}\n\nJoin link: ${joinUrl}\nGoogle Calendar: ${calendarUrl}\nApple / Outlook: ${icsUrl}\nDiscord: ${discordUrl}\n\nStart building free: ${freeUrl}\n\nSmartCode`
	return sendEmail({ to, subject: title, html: emailLayout({ title, previewText: when, contentHtml }), text })
}

/** "Open this on your computer" - Roblox Studio does not run on phones. */
export async function sendLessonLinkEmail({ to, name, lessonTitle, lessonUrl }) {
	const hi = name ? `Hi ${escapeHtml(name)},` : 'Hi,'
	const title = `Open on your computer: ${lessonTitle}`
	const contentHtml = `
		<h1 class="h1">Your lesson is ready on your computer 💻</h1>
		<p class="p">${hi}</p>
		<p class="p">Roblox Studio runs on Windows and Mac, so open this link on your computer to build along:</p>
		<p class="p"><strong>${escapeHtml(lessonTitle)}</strong></p>
		<div class="btn-wrap"><a href="${lessonUrl}" class="btn" target="_blank">Open the lesson</a></div>
		<p class="p">Don't have Roblox Studio yet? It's free: <a href="https://create.roblox.com/">create.roblox.com</a></p>
		<p class="p">Stuck on something? The AI helper under every lesson explains your code and errors.</p>
		<p class="p">See you there,<br><strong>SmartCode</strong></p>
	`
	const text = `${hi}\n\nOpen this lesson on your computer (Roblox Studio runs on Windows and Mac):\n${lessonTitle}\n${lessonUrl}\n\nRoblox Studio is free: https://create.roblox.com/\n\nSmartCode`
	return sendEmail({ to, subject: title, html: emailLayout({ title, previewText: 'Roblox Studio runs on your computer', contentHtml }), text })
}

/** Sent by the webhook after a kit purchase: one-time login link straight to the kit. */
export async function sendKitAccessEmail({ to, name, kitTitle, loginUrl, telegramUrl }) {
	const hi = name ? `Hi ${escapeHtml(name)},` : 'Hi,'
	const title = `Your ${kitTitle} is ready`
	const contentHtml = `
		<h1 class="h1">You're in 🎮</h1>
		<p class="p">${hi}</p>
		<p class="p">Thanks for getting the <strong>${escapeHtml(kitTitle)}</strong>. Tap the button to open your kit - no password needed:</p>
		<div class="btn-wrap"><a href="${loginUrl}" class="btn" target="_blank">Open my kit</a></div>
		<p class="p" style="font-size: 13px; color: #64748b;">The button works once and for 7 days. Later, log in at smartcode.academy with this email, or ask for a new link on the kit page.</p>
		<div class="box">
			<p style="margin: 0 0 8px; font-size: 14px; color: #475569;"><strong>Next:</strong> join our Telegram for new prompts, live builds and help:</p>
			<p style="margin: 0; font-size: 14px;"><a href="${telegramUrl}" style="color: #2563eb;">${telegramUrl}</a></p>
		</div>
		<p class="p">Roblox Studio runs on Windows and Mac - open the kit on your computer to build along.</p>
		<p class="p">Have fun building,<br><strong>SmartCode</strong></p>
	`
	const text = `${hi}\n\nThanks for getting the ${kitTitle}. Open your kit (no password needed, link works once for 7 days):\n${loginUrl}\n\nJoin our Telegram: ${telegramUrl}\n\nSmartCode`
	return sendEmail({ to, subject: title, html: emailLayout({ title, previewText: 'Open your kit - no password needed', contentHtml }), text })
}
