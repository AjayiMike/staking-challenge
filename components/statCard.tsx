import { Box } from 'degen'
import styles from '../styles/statCard.module.css'

type statCarsPropsTypes = {
    keyName: string
    value: string | number
}
const statCard = ({keyName, value}: statCarsPropsTypes) => {
  return (
    <Box
        className = {styles.root}
    >
        <Box
            as = "span"
            className = {styles.key}
        >
            {keyName}
        </Box>

        <Box
            as = "span"
            className = {styles.value}
        >
            {value}
        </Box>
    </Box>
  )
}

export default statCard