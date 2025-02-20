import { Button } from '../ui/button';
import { LogOut, Menu } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/api/slices/authSlice';
import { useToast } from '@/hooks/use-toast';
import PropTypes from 'prop-types';

const Header = ({ onOpenChange}) => {
	const dispatch = useDispatch();
	const {toast} = useToast();
	const logout = ()=>{
		dispatch(logoutUser())
		.then(({payload})=>toast({title: "Logout", description: payload?.message, variant: !payload?.success? "destructive": "" }));
	}
	return (
		<header className='w-full p-2 bg-background flex justify-between lg:justify-end border-b'>
			<Button onClick={onOpenChange} className='block lg:hidden'>
				<Menu size={36} />
				<span className='sr-only'>Toggle Menu</span>
			</Button>
			<Button onClick={logout}>
				<LogOut size={36} />
				Log out
			</Button>
		</header>
	)
}
Header.propTypes = {
	onOpenChange: PropTypes.func
};
export default Header