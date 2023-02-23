import { createContext, ReactElement, ReactNode, useState, useEffect, useContext } from 'react';

interface IScreenContext {
	isDesktop: boolean;
	isMobile: boolean;
}

const ScreenContext = createContext<IScreenContext>({
	isDesktop: false,
	isMobile: false
});

export const ScreenContextProvider = ({ children }: { children: ReactNode }): ReactElement => {
	const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

	useEffect(() => {
		const getScreenSize = () => {
			setScreenSize(window.innerWidth);
		};

		window.addEventListener('resize', getScreenSize);

		return () => {
			window.removeEventListener('resize', getScreenSize);
		};
	}, []);

	return (
		<ScreenContext.Provider
			value={{
				isDesktop: screenSize >= 768,
				isMobile: screenSize < 768
			}}
		>
			{children}
		</ScreenContext.Provider>
	);
};

export const useScreenContext = () => useContext(ScreenContext);
