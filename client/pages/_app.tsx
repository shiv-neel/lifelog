import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/Theme'
import Layout from '../src/components/Layout'
import { Provider, createClient } from 'urql'

const client = createClient({ url: 'http://localhost:4000/graphql' })

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider value={client}>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</Provider>
	)
}
export default MyApp
