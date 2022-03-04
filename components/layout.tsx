import type { AppProps } from 'next/app'
import { ThemeProvider } from 'degen'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '../web3/helpers'
import WalletModal from './walletModal'
import ModalWrapper from './modalWrapper'
import { useState } from 'react'
import Header from './header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({children}: any) => {

  const [isWalletModalOpen, setisWalletModalOpen] = useState<boolean>(false)
  
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
    <ThemeProvider defaultAccent='teal'>
        <Header
          openWalletModal = {() => setisWalletModalOpen(true)}
        />
        {children}

        <ModalWrapper
            open = {isWalletModalOpen}
            label = "connect wallet modal"
            onClose={() => setisWalletModalOpen(false)}
        >
            <WalletModal
              onClose = {() => setisWalletModalOpen(false)}
            />
        </ModalWrapper>
        <ToastContainer 
          newestOnTop={true}
        />
    </ThemeProvider>
  </Web3ReactProvider>
    
  )
}

export default Layout