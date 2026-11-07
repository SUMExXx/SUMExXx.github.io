'use client';
import React from 'react';

type ScrollToProps = {
	id: string;
	children: React.ReactNode;
	className: string;
};

const ScrollTo: React.FC<ScrollToProps> = ({ id, children, className }) => {
	const handleClick = () => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<button onClick={handleClick} className={`cursor-pointer ${className}`}>
			{children}
		</button>
	);
};

export default ScrollTo;
