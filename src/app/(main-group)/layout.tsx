import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { jetBrainsMono } from '@/lib/data/fonts';

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body className={`${jetBrainsMono.className} antialiased`}>
				{/* <StateProvider>
          <AuthContextProvider> */}
				<Navbar />
				<div className="mt-[60px] md:mt-[80px] text-main-foreground md:min-w-[1280px]">{children}</div>
				<Footer />
				{/* <Spinner/> */}
				{/* </AuthContextProvider>
        </StateProvider> */}
			</body>
		</html>
	);
};

export default RootLayout;
