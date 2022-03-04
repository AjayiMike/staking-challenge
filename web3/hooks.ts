import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from './connectors';

export const useEagerConnect = () => {
    const {active, activate} = useWeb3React();
    const [triedEagerConnect, setTriedEagerConnect] = useState(false);

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized: Boolean) => {
            if(isAuthorized) activate(injected);
        }).catch((err: any) => {
            console.log(err)
        }).finally(() => {
            setTriedEagerConnect(true);
        })
    }, [])

    useEffect(() => {
        if(!triedEagerConnect && active)
        setTriedEagerConnect(true);
    },[triedEagerConnect, active])
        
    return triedEagerConnect;
}