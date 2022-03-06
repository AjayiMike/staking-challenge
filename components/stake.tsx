import clsx from 'clsx';
import { Box, Button, Input, Tag } from 'degen'
import Pools from './pools';
import styles from '../styles/stake.module.css';



type stakePropTypes = {
    pools: string
    tokenBalance: number
    value: number
    handleChange: any
    inputErrMsg: string | null
    tokenAllowance: number
    select: any
    selected: number | null
    approve: any
    stake: any
    state: string | null
}

const Stake = ({pools, tokenBalance, value, inputErrMsg, handleChange, state, tokenAllowance, select, selected, approve, stake}: stakePropTypes) => {
    
    return (
        <Box
            className = {styles.container}
        >
            <Box
                as='h3'
                className = {styles.heading}
            >
                STAKE CREATOR/UNI LP token to earn $CREATOR as reward
            </Box>
            <Pools pools = {pools} select = {select} selected = {selected} />
            <Input
                label="Reward rate: 1:2"
                error = {inputErrMsg}
                labelSecondary={<Tag>Bal: {tokenBalance ? tokenBalance.toFixed(2) : 0 } LP</Tag>}
                inputMode = "decimal"
                max={tokenBalance | 1}
                min={0}
                placeholder="10"
                type="number"
                units="LP"
                value={value}
                onChange={handleChange}
            />
            <Box
                as = "button"
                width="full"
                className = {clsx({[styles.stakeBtn]: true, [styles.approvedClass]: value <= tokenAllowance, [styles.disabled]: state !== null})}
                onClick = {value <= tokenAllowance ? stake : approve}
                disabled = {state !== null}
            >   
                {state === null ? value <= tokenAllowance ? "Stake" : "Approve" : state}
            </Box>
        </Box>
    )
}

export default Stake