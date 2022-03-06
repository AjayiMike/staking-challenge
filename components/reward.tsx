import { Box, Stack } from 'degen'
import styles from '../styles/reward.module.css'
import Detail from './detail'
import StatCard from './statCard'
import MyPool from './myPool'
import Pools from './pools'
import { useEffect, useState } from 'react'

type rewardPropTypes = {
    pools: any[],
    state: string | null
    unstake: (id:number) => void,
    claim: (id:number) => void
}

const Reward = ({pools, unstake, claim, state}: rewardPropTypes) => {
    const [totalStaked, setTotalStaked] = useState<string | number>(0)
    const [totalReward, setTotalRewards] = useState<string | number>(0)

    useEffect(() => {
        let total:number = 0, rewards:number = 0;
        pools.forEach((pool: any) => {
            total += parseFloat(pool.stakeAmount);
            rewards += parseFloat(pool.claimableReward);
        })
        setTotalStaked(total);
        setTotalRewards(rewards.toFixed(3));
    
    }, [JSON.stringify(pools)])
    
  return (
    <Box
        as = "div"
        className = {styles.container}
    >
        <Box
            as='h3'
            className = {styles.heading}
        >
            Reward on staked CREATOR/UNI LP token
        </Box>
        <Box 
            className = {styles.statsContainer}
        >
            <StatCard
                keyName = "My pools"
                value= {pools.length}
            />

            <StatCard
                keyName = "Pending rewards"
                value={`${totalReward} CREATOR`}
            />

            <StatCard
                keyName = "Total staked"
                value={totalStaked}
            />

            <StatCard
                keyName = "Reward rate"
                value="1 : 2"
            />
        </Box>


        <Box
            className = {styles.details_and_actions_root}
        >
            {pools.length > 0 ?
            pools.map((pool: any, index: number) => <MyPool key = {index} pool = {pool} unstake = {unstake} claim = {claim} state = {state} />) :
            <Box as = "p" className = {styles.emptyPools}>
                You do not belong to any pool yet!
            </Box>
            }
        </Box>
    </Box>
  )
}

export default Reward
