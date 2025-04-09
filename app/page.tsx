'use client'

import {CssBaseline, ThemeProvider, createTheme} from '@mui/material'
import {StrictMode} from 'react'
import {Data} from './parts/data'

const theme = createTheme({
  colorSchemes: {
    dark: {palette: {mode: 'dark', primary: {main: '#a5cdff'}, secondary: {main: '#68abff'}}},
    light: {palette: {mode: 'light', primary: {main: '#00356b'}, secondary: {main: '#286dc0'}}},
  },
})

export default function Home() {
  return (
    <StrictMode>
      <ThemeProvider theme={theme} defaultMode="dark" noSsr>
        <div suppressHydrationWarning={true}>
          <CssBaseline enableColorScheme />
        </div>
        <Data />
      </ThemeProvider>
    </StrictMode>
  )
}
