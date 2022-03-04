import { Box, Stack } from 'degen'
import styles from '../styles/reward.module.css'
import Detail from './detail'
import StatCard from './statCard'

const Reward = () => {
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
        {/* stats */}
        {/* status */}
        {/* total pool reward */}
        {/* total staked */}
        {/* reward rate */}
        {/* pending rewards */}
        {/* claim */}
        {/* unstake */}
        <Box 
            className = {styles.statsContainer}
        >
            <StatCard
                keyName = "Pool status"
                value="Active"
            />

            <StatCard
                keyName = "Total pool reward"
                value="100 $Creator"
            />

            <StatCard
                keyName = "Total staked"
                value="6,843"
            />

            <StatCard
                keyName = "Reward rate"
                value="1 : 2"
            />
        </Box>


        <Box
            className = {styles.details_and_actions_root}
        >
            <Box as = "h3" className = {styles.heading}>My Data</Box>

            <Box
                className = {styles.details_and_actions}
            >
                <Detail keyName='total staked' value = "20" />
                <Box
                    as = "button"
                    className = {styles.actionBtn}
                >
                    Unstake
                </Box>
            </Box>

            <Box
                className = {styles.details_and_actions}
            >
                <Detail keyName='Withdrawable reward' value = "40" />
                <Box
                    as = "button"
                    className = {styles.actionBtn}
                >
                    Claim
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Reward
