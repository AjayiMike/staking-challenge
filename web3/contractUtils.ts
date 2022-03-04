import ERC20_ABI from "./abis/erc20_abi.json";
import Staking_pool_ABI from "./abis/staking_pool_abi.json";
import { ethers, utils } from "ethers";

export const getTokenInstance = (tokenAddress:string, signer: any) => {
    if (!signer) {
        // if this should happen, we will only be creating a read-only contract instance
        // and this is a provider not signer
        signer = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/9d1f9e8f5fbf596688e88840/eth/ropsten");
        
    }
    
    const tokenInstance = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    return tokenInstance;
}


export const getStakingPoolInstance = (StakingPoolAddress:string, signer: any) => {
    if (!signer) {
        // if this should happen, we will only be creating a read-only contract instance
        // and this is a provider not signer
        signer = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/9d1f9e8f5fbf596688e88840/eth/ropsten");
    }
    const stakingPoolInstance = new ethers.Contract(StakingPoolAddress, Staking_pool_ABI, signer);
    return stakingPoolInstance;
}

export const getStakingPoolsData = async (poolInstance: any) => {
    const poolsCount = await poolInstance.id();
    const poolsHolder = [];
    for(let i = 0; i < poolsCount; i++) {
      const pool = await poolInstance.getPoolByID(i);
      poolsHolder.push({
        id: i,
        totalStakers: pool[0].toString(),
        totalStaked: pool[1].toString(),
        rewardReserve: utils.formatEther(pool[2].toString()),
        rewardRate: pool[3].toString()
      });
    }

    return poolsHolder;
}