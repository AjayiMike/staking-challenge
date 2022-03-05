import clsx from 'clsx';
import { Box, Input } from 'degen'
import styles from '../styles/createPool.module.css';

type createPoolPropTypes = {
    createPool: () => void,
    approve: () => void
    creatorTokenAllowance: number,
    value: number,
    state: string | null,

}

const CreatePool = ({createPool, approve, creatorTokenAllowance, value, state}: createPoolPropTypes) => {
  return (
    <Box className = {styles.root}>
        <Box as = "h3" className = {styles.heading}>Create reward pool</Box>

        <Input
            label="Pool Reward Amount"
            inputMode = "decimal"
            placeholder="100"
            type="number"
            units="Creator"
            value={value}
            disabled = {true}
        />
        <Input
            label="Pool Reward Rate"
            placeholder="1 : 2"
            type="text"
            value = {"1 : 2"}
            disabled = {true}
        />
        <Box
            as = "button"
            width="full"
            onClick = {value <= creatorTokenAllowance ? createPool : approve}
            className = {clsx({[styles.createBtn]: true, [styles.approvedClass]: value <= creatorTokenAllowance})}
            disabled = {state !== null}
        >   
            {state === null ? value <= creatorTokenAllowance ? "Create Pool" : "Approve" : state}
        </Box>
    </Box>
  )
}

export default CreatePool