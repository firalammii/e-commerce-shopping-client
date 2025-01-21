import React from 'react';

const FlexBetween = ({ className, children }) => {
	return (
		<div className={`w-full flex justify-between items-center ${className}`}>
			{children}
		</div>
	);
};

export default FlexBetween;