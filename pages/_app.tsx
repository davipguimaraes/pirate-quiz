import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import db from '../db.json';

const { theme } = db;
const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}
	body {
		margin: 0;
		padding: 0;
		/* New styles */
		display: flex;
		flex-direction: column;
		font-family: 'Lato', sans-serif;
		// Deixa branco no começo
		color: ${({ theme }) => {
			return theme.colors.contrastText;
		}};
	}
	html, body {
		min-height: 100vh;
	}
	#__next {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
`;

export default function App(props: any) {
	const { Component, pageProps } = props;
	return (
		<>
			<Head>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
