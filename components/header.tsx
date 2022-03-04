import { Box, Button, IconWallet, Skeleton, Stack, Text } from 'degen';
import { useWeb3React } from '@web3-react/core';
import styles from '../styles/header.module.css';
import { shortenAddress } from '../utils/helper'

const Header = ({openWalletModal}:any) => {
    const {account, active, activate, deactivate} = useWeb3React()
  return (
    <Box
        as='header'
        className = {styles.header}
    >
        <Stack
            direction="horizontal"
            as = "div"
            align="center"
            justify="space-between"
        >
            <Box
                as = "span"
                className = {styles.textLogo}
            >
                Coinvise
                <Box 
                    as = "span"
                    className = {styles.textLogoVariant}
                >
                    Staking
                </Box>
            </Box>

            {!active ? <Button
            size="small"
            suffix={<IconWallet size="4" className = {styles.btnIcon} />}
            tone="accent"
            variant="primary"
            onClick={openWalletModal}
            >
            Connect Wallet
            </Button> :
            <Box
                className = {styles.connected}
                onClick = {() => deactivate()}
            >
                {shortenAddress(account as string)}
            </Box>}
        </Stack>
  </Box>
  )
}

export default Header