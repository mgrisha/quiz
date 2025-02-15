import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.scss';

import StoreContextProvider from './context/StoreContext.jsx';

createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <App />
  </StoreContextProvider>
)
