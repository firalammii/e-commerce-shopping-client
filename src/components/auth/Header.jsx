import React from 'react'
import { Link } from 'react-router-dom';

const Header = ({title, subTitle, link}) => {
	return (
		<header className='w-full'>
			<h1 className='text-3xl font-bold mb-3 tracking-tight text-foreground'> {title} </h1>
			<p>{subTitle}
				<Link 
					className='ml-2 text-primary hover:underline capitalize' 
					to={`/auth/${link}`}
				>
					{link}
				</Link>
			</p>
		</header>
	)
}

export default Header