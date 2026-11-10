import '@/app/globals.css';
import './portfolio.css';
import { JetBrains_Mono, Space_Grotesk, Unbounded } from 'next/font/google';
import type { Viewport } from 'next';
import Shell from '@/components/portfolio/Shell';
import Nav, { Footer } from '@/components/portfolio/Nav';

const display = Unbounded({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-display' });
const body = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#030106' };

// One root layout for every page, so the particle scene and smooth scroll survive client navigation.
const PortfolioLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
	<html lang="en">
		<body className={`sd3 ${display.variable} ${body.variable} ${mono.variable} antialiased`}>
			<Shell>
				<Nav />
				{children}
				<Footer />
			</Shell>
		</body>
	</html>
);

export default PortfolioLayout;
