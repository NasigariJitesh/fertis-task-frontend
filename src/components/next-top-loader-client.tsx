'use client';

import NextTopLoader from 'nextjs-toploader';
import React from 'react';

const NextTopLoaderClient = () => {
	return (
		<NextTopLoader
			height={3}
			crawl={true}
			easing='ease'
			speed={200}
			zIndex={1000}
			color='#2299DD'
			crawlSpeed={200}
			showSpinner={false}
			initialPosition={0.08}
			shadow='0 0 10px #fff,0 0 5px #fff'
		/>
	);
};

export default NextTopLoaderClient;
