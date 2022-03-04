import clsx from "clsx"
import { Box } from "degen"
import styles from '../styles/pool.module.css'


const Pool = ({pool, selected, select}: any) => {
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
          <Box as = "span" className = {styles.key}>Rewerd reserve</Box>
          <Box as = "span" className = {styles.value}>{pool.rewardReserve}</Box>
        </Box>

        <Box as = "div" className = {styles.pool_data_item}>
          <Box as = "span" className = {styles.key}>Total staked</Box>
          <Box as = "span" className = {styles.value}>{pool.totalStaked}</Box>
        </Box>

        <Box as = "div" className = {styles.pool_data_item}>
          <Box as = "span" className = {styles.key}>Total stakers</Box>
          <Box as = "span" className = {styles.value}>{pool.totalStakers}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Pool