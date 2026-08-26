'use client'

import React, { useEffect, useState, useTransition } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import {
	Award,
	Calendar,
	ChevronRight,
	Crown,
	Flame,
	Gamepad2,
	Gift,
	Medal,
	RefreshCw,
	Sparkles,
	Star,
	Trophy,
	Zap,
} from 'lucide-react'
import styles from './CodeCrushGame.module.css'

export default function ArcadeLeaderboard({ onPlayClick, refreshTrigger = 0 }) {
	const t = useTranslations('dashboard.student.arcade')
	const locale = useLocale()
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [isPending, startTransition] = useTransition()

	const fetchLeaderboard = async () => {
		setLoading(true)
		try {
			const res = await fetch(`/api/arcade/leaderboard?locale=${locale}`, {
				cache: 'no-store',
			})
			if (res.ok) {
				const json = await res.json()
				setData(json)
			}
		} catch (err) {
			console.error('Failed to load arcade leaderboard:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchLeaderboard()
	}, [locale, refreshTrigger])

	const currentUser = data?.currentUser
	const leaderboard = data?.leaderboard || []
	const prizes = data?.prizes || []
	const daysRemaining = data?.daysRemaining ?? 0
	const seasonTitle = data?.seasonTitle || ''
	const totalPlayers = data?.totalPlayers || leaderboard.length

	// Calculate points gap to Top 10 or Top 3
	let ptsToTop10 = 0
	let ptsToTop3 = 0
	if (currentUser && currentUser.played) {
		const top3Score = leaderboard[2]?.score || 0
		const top10Score = leaderboard[9]?.score || 0
		if (currentUser.rank > 3 && top3Score > currentUser.score) {
			ptsToTop3 = top3Score - currentUser.score + 10
		}
		if (currentUser.rank > 10 && top10Score > currentUser.score) {
			ptsToTop10 = top10Score - currentUser.score + 10
		}
	}

	const isUserInList = currentUser && leaderboard.some((p) => p.isCurrentUser)

	return (
		<div className={styles.leaderboardWrap}>
			{/* Season & Tournament Header */}
			<div className={styles.seasonHeader}>
				<div className={styles.seasonInfo}>
					<span className={styles.seasonBadge}>
						<Trophy size={13} aria-hidden />
						{t('seasonBadge', { season: seasonTitle || 'Current' })}
					</span>
					<h3 className={styles.tournamentTitle}>{t('leaderboardTitle')}</h3>
					<p className={styles.tournamentSubtitle}>{t('leaderboardSubtitle')}</p>
				</div>
				<div className={styles.seasonTimer}>
					<Calendar size={15} aria-hidden />
					<span>{t('daysLeft', { days: daysRemaining })}</span>
				</div>
			</div>

			{/* User Rank Card */}
			<div className={styles.userRankCard}>
				{loading ? (
					<div className={styles.rankLoading}>
						<RefreshCw className={styles.spinIcon} size={18} aria-hidden />
						<span>{t('loadingLeaderboard')}</span>
					</div>
				) : currentUser && currentUser.played ? (
					<div className={styles.userRankContent}>
						<div className={styles.rankLeft}>
							<div
								className={[
									styles.rankBadgeLarge,
									currentUser.rank === 1 ? styles.rankGold : null,
									currentUser.rank === 2 ? styles.rankSilver : null,
									currentUser.rank === 3 ? styles.rankBronze : null,
									currentUser.rank <= 10 ? styles.rankTop10 : null,
								]
									.filter(Boolean)
									.join(' ')}
							>
								{currentUser.rank === 1 ? (
									<Crown size={22} className={styles.rankIcon} />
								) : currentUser.rank === 2 ? (
									<Medal size={22} className={styles.rankIcon} />
								) : currentUser.rank === 3 ? (
									<Medal size={22} className={styles.rankIcon} />
								) : (
									<span className={styles.rankNumber}>#{currentUser.rank}</span>
								)}
							</div>
							<div className={styles.rankDetails}>
								<div className={styles.rankLabelRow}>
									<span className={styles.rankLabel}>{t('yourRankTitle')}</span>
									<span className={styles.rankScoreHighlight}>
										{t('monthBest', { score: currentUser.score })}
									</span>
								</div>
								<h4 className={styles.rankHeading}>
									{t('yourRankTop', { rank: currentUser.rank, total: totalPlayers })}
								</h4>
								<p className={styles.rankStatusMessage}>
									{currentUser.rank === 1 ? (
										<span className={styles.statusGold}>{t('inPrizeZone')}</span>
									) : currentUser.rank <= 3 ? (
										<span className={styles.statusGold}>{t('inPrizeZone')}</span>
									) : currentUser.rank <= 10 ? (
										<span className={styles.statusTop10}>
											{t('inTop10')} {ptsToTop3 > 0 ? `· ${t('ptsToTop3', { pts: ptsToTop3 })}` : ''}
										</span>
									) : ptsToTop10 > 0 ? (
										<span className={styles.statusGeneral}>
											{t('ptsToTop10', { pts: ptsToTop10 })}
										</span>
									) : null}
								</p>
							</div>
						</div>
						<button
							type="button"
							className={styles.playNowBtn}
							onClick={onPlayClick}
						>
							<Gamepad2 size={16} aria-hidden />
							{t('tabGame')}
						</button>
					</div>
				) : (
					<div className={styles.unrankedBanner}>
						<div className={styles.unrankedCopy}>
							<div className={styles.unrankedIcon}>
								<Sparkles size={20} aria-hidden />
							</div>
							<div>
								<h4 className={styles.unrankedTitle}>{t('yourRankUnranked')}</h4>
								<p className={styles.unrankedHint}>{t('yourRankUnrankedHint')}</p>
							</div>
						</div>
						<button
							type="button"
							className={styles.playNowBtn}
							onClick={onPlayClick}
						>
							<Gamepad2 size={16} aria-hidden />
							{t('tabGame')}
						</button>
					</div>
				)}
			</div>

			{/* Prizes Showcase Section */}
			<div className={styles.prizesSection}>
				<div className={styles.prizesHead}>
					<div className={styles.prizesTitleRow}>
						<Gift size={18} className={styles.giftIcon} aria-hidden />
						<h4 className={styles.prizesTitle}>{t('prizesTitle')}</h4>
					</div>
					<p className={styles.prizesSubtitle}>{t('prizesSubtitle')}</p>
				</div>

				<div className={styles.prizeGrid}>
					<div className={[styles.prizeCard, styles.prizeCardGold].join(' ')}>
						<div className={styles.prizeCardHeader}>
							<span className={styles.prizeMedalGold}>🥇</span>
							<strong>{t('prize1Title')}</strong>
						</div>
						<p className={styles.prizeRewardText}>{t('prize1Reward')}</p>
					</div>

					<div className={[styles.prizeCard, styles.prizeCardSilver].join(' ')}>
						<div className={styles.prizeCardHeader}>
							<span className={styles.prizeMedalSilver}>🥈</span>
							<strong>{t('prize2Title')}</strong>
						</div>
						<p className={styles.prizeRewardText}>{t('prize2Reward')}</p>
					</div>

					<div className={[styles.prizeCard, styles.prizeCardBronze].join(' ')}>
						<div className={styles.prizeCardHeader}>
							<span className={styles.prizeMedalBronze}>🥉</span>
							<strong>{t('prize3Title')}</strong>
						</div>
						<p className={styles.prizeRewardText}>{t('prize3Reward')}</p>
					</div>

					<div className={[styles.prizeCard, styles.prizeCardTop10].join(' ')}>
						<div className={styles.prizeCardHeader}>
							<span className={styles.prizeMedalTop10}>🎖️</span>
							<strong>{t('prizeTop10Title')}</strong>
						</div>
						<p className={styles.prizeRewardText}>{t('prizeTop10Reward')}</p>
					</div>
				</div>
			</div>

			{/* Leaderboard Table */}
			<div className={styles.tableCard}>
				<table className={styles.leaderboardTable}>
					<thead>
						<tr>
							<th className={styles.thRank}>{t('tableRank')}</th>
							<th className={styles.thStudent}>{t('tableStudent')}</th>
							<th className={styles.thScore}>{t('tableScore')}</th>
							<th className={styles.thLevel}>{t('tableLevel')}</th>
							<th className={styles.thReward}>{t('tableReward')}</th>
						</tr>
					</thead>
					<tbody>
						{leaderboard.length === 0 && !loading ? (
							<tr>
								<td colSpan={5} className={styles.emptyTableTd}>
									{t('noScoresYet')}
								</td>
							</tr>
						) : (
							leaderboard.map((player) => {
								const isUser = player.isCurrentUser
								return (
									<tr
										key={player.userId || player.rank}
										className={[
											styles.leaderRow,
											isUser ? styles.leaderRowUser : null,
											player.rank === 1 ? styles.leaderRowFirst : null,
											player.rank === 2 ? styles.leaderRowSecond : null,
											player.rank === 3 ? styles.leaderRowThird : null,
										]
											.filter(Boolean)
											.join(' ')}
									>
										<td className={styles.tdRank}>
											<span
												className={[
													styles.rankPill,
													player.rank === 1 ? styles.rankPillGold : null,
													player.rank === 2 ? styles.rankPillSilver : null,
													player.rank === 3 ? styles.rankPillBronze : null,
												]
													.filter(Boolean)
													.join(' ')}
											>
												{player.rank === 1
													? '🥇 1'
													: player.rank === 2
													? '🥈 2'
													: player.rank === 3
													? '🥉 3'
													: `#${player.rank}`}
											</span>
										</td>
										<td className={styles.tdStudent}>
											<div className={styles.studentNameWrap}>
												<span className={styles.studentAvatar}>
													{player.name ? player.name.charAt(0).toUpperCase() : 'S'}
												</span>
												<span className={styles.studentName}>
													{player.name}
													{isUser ? (
														<span className={styles.youBadge}>{t('youBadge')}</span>
													) : null}
												</span>
											</div>
										</td>
										<td className={styles.tdScore}>
											<strong className={styles.scoreText}>
												{player.score.toLocaleString()}
											</strong>
										</td>
										<td className={styles.tdLevel}>
											<span className={styles.levelBadge}>
												<Zap size={11} aria-hidden /> Lvl {player.level}
											</span>
										</td>
										<td className={styles.tdReward}>
											{player.rank === 1 ? (
												<span className={styles.rewardPillGold}>
													<Crown size={12} /> {locale === 'uk' ? 'Головний приз' : 'Grand Prize'}
												</span>
											) : player.rank === 2 ? (
												<span className={styles.rewardPillSilver}>
													<Award size={12} /> {locale === 'uk' ? '1:1 Урок' : '1:1 Lesson'}
												</span>
											) : player.rank === 3 ? (
												<span className={styles.rewardPillBronze}>
													<Medal size={12} /> {locale === 'uk' ? 'Discord VIP' : 'Discord VIP'}
												</span>
											) : player.rank <= 10 ? (
												<span className={styles.rewardPillTop10}>
													<Star size={12} /> {locale === 'uk' ? 'Бейдж Топ-10' : 'Top 10 Badge'}
												</span>
											) : (
												<span className={styles.rewardPillNone}>-</span>
											)}
										</td>
									</tr>
								)
							})
						)}
					</tbody>
				</table>

				{/* Pinned user row if outside visible table */}
				{currentUser && currentUser.played && !isUserInList && (
					<div className={styles.pinnedUserRow}>
						<div className={styles.pinnedDivider}>
							<span>•••</span>
						</div>
						<div className={styles.pinnedContent}>
							<div className={styles.pinnedRank}>
								<span className={styles.rankPill}>#{currentUser.rank}</span>
							</div>
							<div className={styles.pinnedStudent}>
								<span className={styles.studentAvatar}>
									{currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'Y'}
								</span>
								<span className={styles.studentName}>
									{currentUser.name} <span className={styles.youBadge}>{t('youBadge')}</span>
								</span>
							</div>
							<div className={styles.pinnedScore}>
								<strong>{currentUser.score.toLocaleString()}</strong>
							</div>
							<div className={styles.pinnedLevel}>
								<span className={styles.levelBadge}>
									<Zap size={11} aria-hidden /> Lvl {currentUser.level}
								</span>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Rules & Info Footnote */}
			<div className={styles.rulesNote}>
				<Sparkles size={14} className={styles.rulesIcon} aria-hidden />
				<div>
					<strong>{t('rulesTitle')} </strong>
					<span>{t('rulesText')}</span>
				</div>
			</div>
		</div>
	)
}
