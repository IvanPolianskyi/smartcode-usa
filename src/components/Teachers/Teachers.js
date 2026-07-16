'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import styles from './Teachers.module.css'

const TEACHERS = [
	{
		key: '0',
		avatar: '/tiktoklogo/00687615ebad2fd100b5ab6dde0a9964~tplv-tiktokx-cropcenter_1080_1080.jpeg',
	},
	{
		key: '1',
		avatar: '/tiktoklogo/15dac559b1a79f75d8c1284cc21348ef~tplv-tiktokx-cropcenter_1080_1080.jpeg',
	},
	{
		key: '2',
		avatar: '/logo.jpeg',
	},
]

export default function Teachers() {
	const t = useTranslations('homeSections.teachers')

	return (
		<section id='teachers' className={styles.section}>
			<div className={styles.container}>
				<div className={styles.header}>
					<span className={styles.badge}>{t('badge')}</span>
					<h2 className={styles.title}>{t('title')}</h2>
					<p className={styles.subtitle}>{t('subtitle')}</p>
				</div>

				<div className={styles.grid}>
					{TEACHERS.map((teacher) => (
						<article key={teacher.key} className={styles.card}>
							<div className={styles.avatarWrap}>
								<Image
									src={teacher.avatar}
									alt={t(`items.${teacher.key}.name`)}
									width={88}
									height={88}
									className={styles.avatar}
								/>
							</div>
							<h3 className={styles.name}>{t(`items.${teacher.key}.name`)}</h3>
							<p className={styles.role}>{t(`items.${teacher.key}.role`)}</p>
							<p className={styles.bio}>{t(`items.${teacher.key}.bio`)}</p>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
