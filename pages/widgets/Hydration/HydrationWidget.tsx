import React, { useState } from 'react'
import Bar from './Bar'
import { BiPlusCircle, BiMinusCircle } from 'react-icons/bi'
import { Heading } from '@chakra-ui/react'
const HydrationWidget = () => {
	const [cups, setCups] = useState<number>(0)
	const d = new Date()
	if (d.getHours() === 0 && d.getMinutes() === 0) {
		setCups(0)
	}
	return (
		<div className='items-center m-10 min-h-fit'>
			<Heading as='h1' className='flex justify-center'>
				Hydrate!
			</Heading>
			<div className='flex justify-center items-center gap-10 p-10'>
				<Bar cups={cups} />
				<div className=''>
					<Heading as='h3' className='flex justify-center p-5'>
						{cups}
					</Heading>
					<div className='btns flex justify-center gap-3 text-4xl'>
						<BiPlusCircle
							onClick={() => {
								cups < 8 ? setCups((prev) => prev + 1) : null
							}}
							className='cursor-pointer hover:scale-110 duration-150'
						/>
						<BiMinusCircle
							onClick={() => {
								cups > 0 ? setCups((prev) => prev - 1) : null
							}}
							className='cursor-pointer hover:scale-110 duration-150'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HydrationWidget
