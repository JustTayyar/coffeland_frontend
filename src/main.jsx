import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n'

import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  </>,
)
