import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import PageLoader from './components/PageLoader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageLoader />
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
)
