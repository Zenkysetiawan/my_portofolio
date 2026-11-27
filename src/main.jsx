import { StrictMode } from 'react'
import { MotionConfig } from 'motion/react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        {/* reducedMotion="user": kalau perangkat meminta animasi dikurangi, gerakan besar dimatikan */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
)
