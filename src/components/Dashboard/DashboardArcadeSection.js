'use client'

import CodeCrushGame from '@/components/Dashboard/CodeCrushGame'
import StudyActivityChart from '@/components/Dashboard/StudyActivityChart'
import styles from './DashboardArcadeSection.module.css'

export default function DashboardArcadeSection({ bestScore, onRoundEnd }) {
	return (
		<div className={styles.row}>
			<StudyActivityChart />
			<CodeCrushGame
				embedded
				bestScore={bestScore}
				onRoundEnd={onRoundEnd}
			/>
		</div>
	)
}
