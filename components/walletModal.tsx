import { NextComponentType } from 'next'
import { useWeb3React } from "@web3-react/core";
import clsx from 'clsx';
import { Box, Text, Stack } from 'degen';
import { connectorsData } from '../web3/connectors';
import styles from '../styles/walletModal.module.css'
import {CgCloseR} from 'react-icons/cg'
import { useEffect } from 'react';

const WalletModal = ({onClose}: any) => {

    const {activate, active, setError} = useWeb3React()

    const connectWallet = (connector: any) => {
        activate(connector, (err) => {onClose(); setError(err)})
    }

    useEffect(() => {
      if(active) onClose()
    }, [active])
    
  return (
      <>
         <Stack
            direction="horizontal"
            as = "div"
            align="center"
            justify="space-between"
        >
            <Text as = "h2">Connect Wallet</Text>

            <CgCloseR className = {styles.closeIcon} onClick = {onClose}/>

        </Stack>

        <Box>
        {connectorsData.map((connectorObj, idx) => {
                return(
                    <button key={idx}
                        className={styles.connectBtn}
                        onClick={() => connectWallet(connectorObj.connector)}
                        
                        
                    >
                        <span className="">{connectorObj.name}</span>
                    </button>
                )
            })}
        </Box>
      </>
  )
}

export default WalletModal