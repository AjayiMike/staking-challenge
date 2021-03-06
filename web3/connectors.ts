import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';


const rpcUrls = {
    3: 'https://speedy-nodes-nyc.moralis.io/9d1f9e8f5fbf596688e88840/eth/ropsten',
}

export const injected: any = new InjectedConnector({
    supportedChainIds: [3]
    
});

const walletConnect: any = new WalletConnectConnector({
    rpc: {
        3: rpcUrls[3]
    }
})

interface IConnectorData {
    name: string,
    connector: any
}

export const connectorsData: IConnectorData[] = [
    {
        name: 'Browser wallet',
        connector: injected
    },
    {
        name: 'WalletConnect',
        connector: walletConnect
    }
]
