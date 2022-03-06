import clsx from "clsx"
import { Box } from "degen"
import styles from '../styles/myPool.module.css'


const MyPool = ({pool, selected, select}: any) => {
  return (
    <Box className = {clsx({[styles.root]: true, [styles.selected]: selected === pool.id})}
      onClick = {() => select(pool.id)}
    >
      <Box className = {styles.id}>
        <Box as = "span">
          ID: {pool.id}
        </Box>
      </Box>
      <Box className = {styles.pool_data}>
        <Box as = "div" className = {styles.pool_data_item}>
          <Box as = "span" className = {styles.key}>Ratio</Box>
          <Box as = "span" className = {styles.value}>1 : {pool.rewardRate}</Box>
        </Box>

        <Box as = "div" className = {styles.pool_data_item}>
          <Box as = "span" className = {styles.key}>Stake amount</Box>
          <Box as = "span" className = {styles.value}>{pool.stakeAmount}</Box>
        </Box>

        <Box as = "div" className = {styles.pool_data_item}>
          <Box as = "span" className = {styles.key}>Claimable reward</Box>
          <Box as = "span" className = {styles.value}>{parseFloat(pool.claimableReward).toFixed(3)}</Box>
        </Box>

                
          <Box as = "button" className = {styles.actionBtn}>
              Unstake
          </Box>
          <Box as = "button" className = {styles.actionBtn} >
              Claim
          </Box>
      </Box>
    </Box>
  )
}

export default MyPool