import { Box } from "degen"
import Pool from "./pool"
import styles from '../styles/pools.module.css'
const Pools = ({pools, select, selected}:any) => {
    if(!pools.length) {
        return(
            <Box
                as = "div"
                className = {styles.root}
            >
                <Box as = "p" className = {styles.emptyPools}>
                    No pool created yet!
                </Box>
            </Box>
        )
    }

    return(
        <Box as = "div" className = {styles.root} >
            <Box as = "h4" className = {styles.poolsHeading}>Pools</Box>
            <Box className = {styles.poolsContianer}>
                {
                    pools.map((pool:any, index: number) => {
                        return <Pool key = {index} pool = {pool} select = {select} selected = {selected} />
                    })
                }
            </Box>
        </Box>
    )
}

export default Pools