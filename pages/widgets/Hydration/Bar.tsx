import React, { useState } from 'react'
import Anime, { anime } from 'react-animejs-wrapper'

interface blockProps {
	isBottom?: boolean
	isTop: boolean
	cups?: number
}

interface BarProps {
	cups: number
}

const WaterBlock: React.FC<blockProps> = ({ isBottom, isTop, cups }) => {
	return (
		<div
			style={{
				width: '109px',
				height: '26.75px',
				backgroundColor: '#4AB6F3',
				borderRadius: `${isTop && cups !== 8 ? '10px 10px 0px 0px' : '0 0 '}`,
				marginBottom: `${isBottom ? '8px' : 0}`,
			}}
		></div>
	)
}

const Bar: React.FC<BarProps> = ({ cups }) => {
	return (
		<div className='flex justify-center' style={{ minHeight: '75px' }}>
			<svg
				width='115'
				height='297'
				viewBox='0 0 115 297'
				fill='none'
				className='absolute z-0'
			>
				<path
					d='M11 44.5H104C109.247 44.5 113.5 48.7533 113.5 54V286C113.5 291.247 109.247 295.5 104 295.5H11C5.75329 295.5 1.5 291.247 1.5 286V54C1.5 48.7533 5.75329 44.5 11 44.5Z'
					fill='white'
					stroke='black'
					strokeWidth='3'
				/>
				<path
					d='M85 11.5H30C26.9624 11.5 24.5 13.9624 24.5 17V41C24.5 42.3807 25.6193 43.5 27 43.5H88C89.3807 43.5 90.5 42.3807 90.5 41V17C90.5 13.9624 88.0376 11.5 85 11.5Z'
					fill='black'
					stroke='black'
					strokeWidth='3'
				/>
				<path
					d='M82 3H33C29.134 3 26 6.13401 26 10V17C26 19.2091 27.7909 21 30 21H85C87.2091 21 89 19.2091 89 17V10C89 6.13401 85.866 3 82 3Z'
					fill='white'
					stroke='black'
					strokeWidth='6'
				/>
				<rect
					x='91.5'
					y='19.5'
					width='2'
					height='16'
					rx='1'
					fill='#C4C4C4'
					stroke='black'
				/>
				<rect
					x='21.5'
					y='19.5'
					width='2'
					height='16'
					rx='1'
					fill='#C4C4C4'
					stroke='black'
				/>
				<path
					d='M3 277H112V286C112 290.418 108.418 294 104 294H11C6.58172 294 3 290.418 3 286V277Z'
					fill='#B4B4B4'
					fill-opacity='0.59'
				/>
				<path
					d='M3 54C3 49.5817 6.58172 46 11 46H104C108.418 46 112 49.5817 112 54V63H3V54Z'
					fill='#B4B4B4'
					fill-opacity='0.59'
				/>
			</svg>

			<div className='absolute bottom-0 z-30'>
				<Anime
					config={{
						translateY: 50,
						delay: anime.stagger(50),
						opacity: 0.8,
					}}
				>
					<div className=''>
						{cups >= 8 ? (
							<WaterBlock cups={8} isTop={cups === 8} isBottom={false} />
						) : (
							<></>
						)}
					</div>
					<div>
						{cups >= 7 ? (
							<WaterBlock isTop={cups === 7} isBottom={false} />
						) : (
							<></>
						)}
					</div>
					<div>
						{cups >= 6 ? (
							<WaterBlock isTop={cups === 6} isBottom={false} />
						) : (
							<></>
						)}
					</div>
					<div>
						{cups >= 5 ? (
							<WaterBlock isTop={cups === 5} isBottom={false} />
						) : (
							<></>
						)}
					</div>
					<div>
						{cups >= 4 ? (
							<WaterBlock isTop={cups === 4} isBottom={false} />
						) : (
							<></>
						)}
					</div>
					<div>
						{cups >= 3 ? (
							<WaterBlock isTop={cups === 3} isBottom={false} />
						) : (
							<></>
						)}
					</div>
					<div className=' bottom-0'>
						{cups >= 2 ? (
							<WaterBlock isTop={cups === 2} isBottom={false} />
						) : (
							<></>
						)}
					</div>
					<div className='bottom-0'>
						{cups >= 1 ? (
							<WaterBlock isTop={cups === 1} isBottom={true} />
						) : (
							<></>
						)}
					</div>
				</Anime>
			</div>
		</div>
	)
}

export default Bar
