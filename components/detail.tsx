import { Box } from 'degen'
import React from 'react'
import styles from '../styles/detail.module.css'


type statCarsPropsTypes = {
    keyName: string
    value: string | number
}
const Detail = ({keyName, value}: statCarsPropsTypes) => {
  return (
    <Box
        className = {styles.root}
    >
        <Box
            as = "span"
            className = {styles.value}
        >
            {value} <Box as = "span" className = {styles.symbol}>$Creator</Box>
        </Box>

        <Box
            as = "span"
            className = {styles.key}
        >
            {keyName}
        </Box>
    </Box>
  )
}

export default Detail