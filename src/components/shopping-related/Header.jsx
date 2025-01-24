import { Command } from 'lucide-react';
import React from 'react'
import { FlexBetween, FlexCentered } from '../common';
import { Link } from 'react-router-dom';
import { iconSize } from '@/data';

const ShoppingHeader = () => {
	return (
		<header className='sticky top-0 p-2  bg-muted border-b'>
			<FlexBetween className>
				<div className='flex items-center gap-2 px-5 lowercase'>
					<Command size={iconSize.small} />
					<h1 className='whitespace-nowrap text-sm tracking-tighter font-bold'>Fira-Shopping</h1>
				</div>

				<FlexCentered className>
					{
					}
					<Link className='py-1 border px-3 rounded-md' to='/shop/home' >Home</Link>
					<Link className='py-1 border px-3 rounded-md' to='/shop/home' >Home</Link>
					<Link className='py-1 border px-3 rounded-md' to='/shop/home' >Home</Link>
				</FlexCentered>
			</FlexBetween>
		</header>
	)
}

export default ShoppingHeader