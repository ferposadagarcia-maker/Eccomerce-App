import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'
import './styles/authForm.css';
import './styles/global.css';
import './styles/adminPage.css';
import './styles/orderPage.css';
import './styles/cartPage.css';
import './styles/catalogPage.css';
import './styles/layout.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
