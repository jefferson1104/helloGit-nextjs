import React from 'react';
import GlobalStyle from '../styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { AuthContextProvider } from '../contexts/AuthContext';

const theme = {
  colors: {
    primary: '#F4F4F4',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  )
}
