import { utils } from 'ethers'
import {useState, useEffect} from 'react'
import { addresses } from '../../utils/constant'
import { getTokenInstance, getStakingPoolInstance, getStakingPoolsData, getUserOwnedPoolsData } from '../contractUtils'

const useContract = (active:boolean, library:any) => {
    let creator_token_instance: any, lp_token_instance:any, staking_pool_instance:any
    const [pools, setPools] = useState<any>([])


    // this is only needed for  getting pools regardless of whether or not there is a signer
    useEffect(() => {
        const signer = library?.getSigner();
        staking_pool_instance = getStakingPoolInstance(addresses.staking_pool, signer);
        fetchPoolsData()
    }, [])

    const fetchPoolsData = async() => {
        const pools = await getStakingPoolsData(staking_pool_instance);
        setPools(pools)
    }

    const fetchUserPools = async (account: string) => {
        const signer = library.getSigner();
        staking_pool_instance = getStakingPoolInstance(addresses.staking_pool, signer);
        const pools = await getUserOwnedPoolsData(staking_pool_instance, account);
        return pools;
    }

    useEffect(() => {
        const signer = library?.getSigner();
        creator_token_instance = getTokenInstance(addresses.creator_token, signer);
        lp_token_instance = getTokenInstance(addresses.lp_token, signer);
        staking_pool_instance = getStakingPoolInstance(addresses.staking_pool, signer);
    }, [active])

    const approveToken = async (tokenAddress: string, who: string, amount: string) => {
        const parseAmount = utils.parseEther(amount)
        const signer = library?.getSigner();
        const tokenInstance = getTokenInstance(tokenAddress, signer);
        return await tokenInstance.approve(who, parseAmount);
    }

    const getTokenBalance = async (tokenAddress: string, account: string) => {
        const signer = library?.getSigner();
        const tokenInstance = getTokenInstance(tokenAddress, signer);
        return await tokenInstance.balanceOf(account);
    }

    const getTokenAllowance = async (tokenAddress: string, owner: string, spender: string) => {
        const signer = library?.getSigner();
        const tokenInstance = getTokenInstance(tokenAddress, signer);
        return await tokenInstance.allowance(owner, spender);
    }

    const stakeLpToken = async (poolId: number, amount: string) => {
        const parseAmount = utils.parseEther(amount)
        // signer is needed here
        const signer = library.getSigner();
        const stakingPoolInstance = getStakingPoolInstance(addresses.staking_pool, signer);
        return await stakingPoolInstance.stake(poolId, parseAmount);
    }

    const createStakingPool = async (rewardRate: number) => {
        // signer is needed here
        const signer = library.getSigner();
        const stakingPoolInstance = getStakingPoolInstance(addresses.staking_pool, signer);
        return await stakingPoolInstance.createPool(2);
    }

    
    

      return {
          pools,
          approveToken,
          getTokenBalance,
          getTokenAllowance,
          stakeLpToken,
          createStakingPool,
          fetchUserPools
        }; 
      
}

export default useContract