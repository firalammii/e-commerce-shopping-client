import React from 'react';

export const FlexBetween = ({ className, children, onClick }) => {
	return (
		<div onClick={onClick} className={`w-full flex justify-between items-center ${className}`}>
			{children}
		</div>
	);
};
export const FlexColumn = ({ className, children, onClick }) => {
	return (
		<div onClick={onClick} className={`w-full flex flex-col gap-1 ${className}`}>
			{children}
		</div>
	);
};
export const FlexCentered = ({ className, children, onClick }) => {
	return (
		<div onClick={onClick} className={`w-full flex justify-center items-center gap-1 ${className}`}>
			{children}
		</div>
	);
};
