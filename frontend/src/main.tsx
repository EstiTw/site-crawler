import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { DealsProvider } from './context/DealsContext'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <DealsProvider>
          <App />
        </DealsProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
