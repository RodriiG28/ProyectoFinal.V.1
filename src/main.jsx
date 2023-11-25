import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Main } from './Components/Main/Main.jsx'
import { Header } from './Components/Header/Header.jsx'
import { Footer } from './Components/Footer/Footer.jsx'

import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <ChakraProvider>
    <Header/>
    <Main/>
    <Footer/>
  </ChakraProvider>,



  // <React.StrictMode>
  //   <Header/>
  //   <Main/>
  //   <Footer/>
  // </React.StrictMode>,
)
