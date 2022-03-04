import { Box } from 'degen'
import React from 'react'
import styles from '../styles/tab.module.css'
import { TabPropTypes } from '../utils/types'
import { tabStates } from '../utils/constant'
import clsx from 'clsx'



const Tab = ({current, changeTab}: TabPropTypes) => {
    
  return (
    <Box
        className = {styles.root}
    >
        <Box
            as = "button"
            className = {clsx({[styles.tabs]: true, [styles.currentTab]: current == tabStates.stake})}
            onClick = {() => changeTab(tabStates.stake)}
        >
            Stake
        </Box>

        <Box
            as = "button"
            className = {clsx({[styles.tabs]: true, [styles.currentTab]: current == tabStates.reward})}
            onClick = {() => changeTab(tabStates.reward)}
        >
            Rewards
        </Box>

        <Box
            as = "button"
            className = {clsx({[styles.tabs]: true, [styles.currentTab]: current == tabStates.create_pool})}
            onClick = {() => changeTab(tabStates.create_pool)}
        >
            Create pool
        </Box>
    </Box>
  )
}

export default Tab