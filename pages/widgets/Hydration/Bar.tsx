import React, { useState } from 'react'
import Anime, { anime } from 'react-animejs-wrapper'

interface blockProps {
	isBottom?: boolean
	isTop: boolean
}

interface BarProps {
	cups: number
}

const WaterBlock: React.FC<blockProps> = ({ isBottom, isTop }) => {
	return (
		<div
			style={{
				width: '100px',
				height: '30px',
				backgroundColor: '#4AB6F3',
				borderRadius: `${isTop ? '18px 18px ' : '0 0 '} ${
					isBottom ? '18px 18px ' : '0 0 '
				}`,
				marginBottom: `${isBottom ? '10px' : 0}`,
			}}
		></div>
	)
}

const Bar: React.FC<BarProps> = ({ cups }) => {
	return (
		<div className='flex justify-center'>
			<svg
				width='115'
				height='282'
				viewBox='0 0 115 282'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				className='absolute'
			>
				<path
					d='M20 29.5H95C105.217 29.5 113.5 37.7827 113.5 48V262C113.5 272.217 105.217 280.5 95 280.5H20C9.78273 280.5 1.5 272.217 1.5 262V48C1.5 37.7827 9.78273 29.5 20 29.5Z'
					stroke='black'
					strokeWidth='3'
				></path>
				<rect
					x='29.5'
					y='1.5'
					width='56'
					height='28'
					rx='5.5'
					fill='white'
					stroke='black'
					strokeWidth='3'
				/>
				<line x1='40.5' y1='2' x2='40.5' y2='28' stroke='black' />
				<line x1='51.5' y1='2' x2='51.5' y2='28' stroke='black' />
				<line x1='62.5' y1='2' x2='62.5' y2='28' stroke='black' />
				<line x1='73.5' y1='2' x2='73.5' y2='28' stroke='black' />
			</svg>

			<Anime
				config={{
					translateY: 70,
					delay: anime.stagger(50),
				}}
			>
				<div>
					{cups >= 8 ? (
						<WaterBlock isTop={cups === 8} isBottom={false} />
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
				<div>
					{cups >= 2 ? (
						<WaterBlock isTop={cups === 2} isBottom={false} />
					) : (
						<></>
					)}
				</div>
				<div>
					{cups >= 1 ? (
						<WaterBlock isTop={cups === 1} isBottom={true} />
					) : (
						<></>
					)}
				</div>
			</Anime>
		</div>
	)
}

export default Bar
