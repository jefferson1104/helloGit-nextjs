import React from 'react';
import GlobalStyle from '../styles/globalStyles';
import { ThemeProvider } from 'styled-components';

// import { AuthProvider } from '../contexts/AuthContext';
import { Provider } from 'next-auth/client'


const theme = {
  colors: {
    primary: '#F4F4F4',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
