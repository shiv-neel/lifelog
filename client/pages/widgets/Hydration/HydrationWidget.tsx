import React, { useState } from 'react'
import Bar from './Bar'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

import { Heading } from '@chakra-ui/react'
const HydrationWidget = () => {
	const [cups, setCups] = useState<number>(0)
	const d = new Date()
	if (d.getHours() === 0 && d.getMinutes() === 0) {
		setCups(0)
	}
	return (
		<div className='m-2 min-h-fit'>
			<div className='flex justify-center p-5'>
				<div className='flex absolute pb-40'>
					<Bar cups={cups} />
				</div>
				<div className='absolute mt-20 z-50'>
					<Heading as='h3' className='flex justify-center p-5 select-none'>
						{cups}
					</Heading>
					<div className='btns flex justify-center gap-3 text-4xl'>
						<IoIosArrowUp
							onClick={() => {
								cups < 8 ? setCups((prev) => prev + 1) : null
							}}
							className='cursor-pointer hover:scale-110 duration-150'
						/>
						<IoIosArrowDown
							onClick={() => {
								cups > 0 ? setCups((prev) => prev - 1) : null
							}}
							className='cursor-pointer hover:scale-110 duration-150'
						/>
					</div>
					{cups === 4 ? (
						<p className='flex justify-center select-none'>Halfway there!</p>
					) : (
						<></>
					)}
					{cups === 8 ? (
						<p className='flex justify-center select-none'>Great work!</p>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	)
}

export default HydrationWidget
