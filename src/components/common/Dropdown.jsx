import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '../ui/button';
import { FlexColumn } from '.';

// { label: "Profile", value: 'profile'; }, { label: "Billing", value: 'billing'; }, { label: "Team", value: 'team'; }, { label: "Subscription", value: 'Subscription'; },
// items = ["profile", "Billing", "Team", "Subscription"]

const Dropdown = ({ trigger, title = "My Account", items = [] }) => {
	return (
		<DropdownMenu >
			<DropdownMenuTrigger >{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel >{title}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<FlexColumn className='gap-1' >
					{
						items.map(({ label, value, onClick }) => (<DropdownMenuItem className='p-0' key={value}>
							<Button onClick={onClick} value={value} variant='outline' className='w-full'>{label}</Button>
						</DropdownMenuItem>))
					}
				</FlexColumn>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default Dropdown;