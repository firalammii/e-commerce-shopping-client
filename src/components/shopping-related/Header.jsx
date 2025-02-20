import { Command } from 'lucide-react';
import { Dropdown, FlexBetween, FlexCentered } from '../common';
import { Link, useNavigate } from 'react-router-dom';
import { iconSize } from '@/data';
import { Avatar } from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { currUserSelector, logoutUser } from '@/api/slices/authSlice';

const ShoppingHeader = () => {
	const currUser = useSelector(currUserSelector);
	const avatarFb = currUser?.userName[0]?.toUpperCase();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const dropdownItems =
		[{ label: "Profile", value: "profile", onClick: () => navigate('/shop/user/profile'), }, { label: "Setting", value: "setting", onClick: () => navigate('/shop/user/setting'), }, { label: "Logout", value: "logout", onClick: () => dispatch(logoutUser()), }]

	return (
		<header className='sticky top-0 p-2  bg-muted border-b'>
			<FlexBetween className>
				<div className='flex items-center gap-2 px-5'>
					<Command size={iconSize.small} />
					<h1 className='whitespace-nowrap text-md tracking-tighter font-bold'>E-Commerce <span className='text-sm text-muted-foreground'>fira-shopping</span></h1>
				</div>

				<FlexCentered className>
					{
					}
					<Link className='py-1 border px-3 rounded-md' to='/shop/home' >Home</Link>
					<Link className='py-1 border px-3 rounded-md' to='/shop/home' >Home</Link>
					<Link className='py-1 border px-3 rounded-md' to='/shop/home' >Home</Link>
				</FlexCentered>
				<div className='flex items-center justify-end gap-3 w-1/3 pr-2'>
					<Dropdown
						trigger={<Avatar className='border rounded-full' avatarFb={avatarFb} />}
						title='Account'
						items={dropdownItems}
					/>
				</div>
			</FlexBetween>
		</header>
	)
}

export default ShoppingHeader