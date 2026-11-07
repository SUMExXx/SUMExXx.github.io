'use client';
import React, { useState } from 'react';
import { useEffect } from 'react';

const ProgressBar = () => {
	const [width, setWidth] = useState<number>(0.001);

	useEffect(() => {
		const handleScroll = () => {
			// Calculate the scroll percentage
			const scrollTop = window.scrollY;
			const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercentage = scrollTop / documentHeight;

			// Calculate new width as a percentage
			const newWidth = scrollPercentage * 100; // Adjust the width scale here
			setWidth(newWidth);
		};

		// Add event listener for scroll
		window.addEventListener('scroll', handleScroll);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div
			className="w-full h-[6px] fixed md:top-[80px] top-[60px] left-0 flex justify-start items-start grid-back z-40 bg-black"
			id="progress-bar"
		>
			<div id="progress" className={`bg-main-primary h-[6px] z-40`} style={{ width: `${width}%` }}></div>
		</div>
	);
};

export default ProgressBar;
