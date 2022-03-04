import clsx from 'clsx';
import { Box, Input } from 'degen'
import styles from '../styles/createPool.module.css';

const CreatePool = ({createPool, creatorTokenAllowance, value}: any) => {
  return (
    <Box className = {styles.root}>
        <Box as = "h3" className = {styles.heading}>Create reward pool</Box>

        <Input
            label="Pool Reward Amount"
            inputMode = "decimal"
            placeholder="100"
            type="number"
            units="Creator"
            value={100}
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
            onClick={createPool}
            className = {clsx({[styles.createBtn]: true, [styles.approvedClass]: value <= creatorTokenAllowance})}
        >   
            {value <= creatorTokenAllowance ? "Stake" : "Approve"}
        </Box>
    </Box>
  )
}

export default CreatePool