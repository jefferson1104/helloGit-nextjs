import React from 'react';
import GlobalStyle from '../styles/globalStyles';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from '../contexts/AuthContext';

const theme = {
  colors: {
    primary: '#F4F4F4',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}
