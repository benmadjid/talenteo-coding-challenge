import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import AppProviders from './providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
    </AppProviders>
  </StrictMode>,
)
