import { Box } from 'degen'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect } from '../web3/hooks'
import { useEffect, useState } from 'react'
import { getConnectionError } from '../web3/helpers'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tab from '../components/tab'
import Stake from '../components/stake'
import Reward from '../components/reward'
import { tabStates } from '../utils/constant'
import { addresses } from '../utils/constant'
import { utils } from 'ethers'
import useContract from '../web3/hooks/useContract'
import CreatePool from '../components/createPool'

const Home: NextPage = () => {

  const {account, active, activate, deactivate, error, library} = useWeb3React()
  const [currentTab, setCurrentTab] = useState<'stake' | 'reward' | 'create-pool'>(tabStates.stake as 'stake' | 'reward' | 'create-pool')
  const [inputValue, setInputValue] = useState(0)
  const [inputErrMsg, setInputErrMsg] = useState<string | null>(null)
  const [creatorTokenBalance, setCreatorTokenBalance] = useState<string>("")
  const [creatorTokenAllowance, setCreatorTokenAllowance] = useState<string>("")
  const [lpTokenBalance, setLpTokenBalance] = useState<string>("")
  const [lpTokenAllowance, setLpTokenAllowance] = useState<string>("")
  const [selectedPool, setSelectedPool] = useState<number | null>(null)
  const [stakeComponentState, setStakeComponentState] = useState<string | null>(null)
  const [CreatePoolComponentState, setCreatePoolComponentState] = useState<string | null>(null)
  

  // useContract here
  const {pools: stakingPools, approveToken, getTokenBalance, getTokenAllowance, stakeLpToken, createStakingPool} = useContract(active, library);
 

  const inputChange = (e: any) => {
    setInputValue(e.target.value) 
    if(parseFloat(e.target.value) > parseFloat(lpTokenBalance))
        return setInputErrMsg("Insufficient token balance")
    setInputErrMsg(null)
}

const selectPool = (id: number) => {
  setSelectedPool(id)
}


const approveCreatePool = async () => {
  if(!active) return toast.error("You need to connect your wallet!")
  try {
      const approveTx = await approveToken(addresses.creator_token, addresses.staking_pool, "100");
      const approveTxHash = await library.getTransaction(approveTx.hash);
      setCreatePoolComponentState("approving...")
      await approveTxHash.wait();
      const approveTxReciept = await library.getTransactionReceipt(approveTxHash.hash)
      if(approveTxReciept && approveTxReciept.blockNumber) {
        toast.success("token approval successfull!");
      } else {
        toast.error("error occured, could not approve token!");
    }
  } catch(err) {
    toast.error("error occured, Approval unsuccessfull!");
  } finally {
    setCreatePoolComponentState(null)
  }  
  await setConnectedUserData()
}

const createPool = async () => {
  if(!active) return toast.error("You need to connect your wallet!")
  try {
    const createPool = await createStakingPool(2); // hardCoding the reward rate: 1:2
    const createPoolHash = await library.getTransaction(createPool.hash);
    setCreatePoolComponentState("creating pool...")
    await createPoolHash.wait();
    const createPoolReciept = await library.getTransactionReceipt(createPoolHash.hash)
    if(createPoolReciept && createPoolReciept.blockNumber) {
      toast.success("staking pool successfully created!");
    } else {
      
      toast.error("error occured, could not create pool");
    }
  } catch(err) {
    toast.error("error occured, could not create pool");
  } finally {
    setCreatePoolComponentState(null)
  }
  await setConnectedUserData()
}



const approveStake = async () => {
  if(!active) return toast.error("You need to connect your wallet!")
  if(selectedPool === null) return toast.error("You need to select a pool in which you wish to stake")
  try {
      const approveTx = await approveToken(addresses.lp_token, addresses.staking_pool, inputValue.toString());
      const approveTxHash = await library.getTransaction(approveTx.hash);
      setStakeComponentState("approving...")
      await approveTxHash.wait();
      const approveTxReciept = await library.getTransactionReceipt(approveTxHash.hash)
      if(approveTxReciept && approveTxReciept.blockNumber) {
        toast.success("token approval successfull!");
      } else {
        toast.error("error occured, could not approve token!");
    }
  } catch(err) {
    toast.error("error occured, Approval unsuccessfull!");
  } finally {
    setStakeComponentState(null)
  }  

  await setConnectedUserData()
}

const stake = async () => {
  if(!active) return toast.error("You need to connect your wallet!")
  if(selectedPool === null) return toast.error("You need to select a pool in which you wish to stake")
  try {
    const stakeTx = await stakeLpToken(selectedPool, inputValue.toString());
    const stakeTxHash = await library.getTransaction(stakeTx.hash);
    setStakeComponentState("staking...")
    await stakeTxHash.wait();
    const stakeTxReciept = await library.getTransactionReceipt(stakeTxHash.hash)
    if(stakeTxReciept && stakeTxReciept.blockNumber) {
      toast.success("LP token successfully staked!");
    } else {
      
      toast.error("error occured, could not stake LP token");
    }
  } catch(err) {
    toast.error("error occured, could not stake LP token");
  } finally {
    setStakeComponentState(null)
  }
  await setConnectedUserData()
  
}



  useEffect(() => {
    if(error)
      toast.error(getConnectionError(error));
  }, [error])

  useEffect(() => {
    if(active) {
      toast.success("connected!")
      setConnectedUserData();
    }
  }, [active])

  const setConnectedUserData = async () => {
    const creatorTokenBal = await getTokenBalance(addresses.creator_token, account as string);
    const lpTokenBal = await getTokenBalance(addresses.lp_token, account as string);
    const creatorTokenAllowance = await getTokenAllowance(addresses.creator_token, account as string, addresses.staking_pool);
    const lpTokenAallowance = await getTokenAllowance(addresses.lp_token, account as string, addresses.staking_pool);
    setCreatorTokenBalance(utils.formatEther(creatorTokenBal))
    setCreatorTokenAllowance(utils.formatEther(creatorTokenAllowance))
    setLpTokenBalance(utils.formatEther(lpTokenBal))
    setLpTokenAllowance(utils.formatEther(lpTokenAallowance))
  }

  
  
  // eagerly connect injected wallet if previously connected
  useEagerConnect();

  return (
    <Box
      as='div'
      className = {styles.main}
    >
      <Box 
        as = "h1"
        className = {styles.heading}
      >
        Earn reward on your CREATOR/UNI LP Token
      </Box>
      <Box 
        as = "p"
        className = {styles.text}
      >
        Stake Uniswap v2 CREATOR/UNI Liquidity Pool token to earn $CREATOR. To acquire the Liquidity Pool token. you will need to provide liquidity to the
        <Box as = "a" className = {styles.poolLink} href="https://app.uniswap.org/#/add/v2/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/0xfe89Bc35f0ae233a4E619b44C41caF7eAF78a411?chain=ropsten" target="_blank">
          &nbsp; CREATOR/UNI Uniswap V2 Pool ↗
        </Box>
      </Box>
      <Box
        className = {styles.mainContent}
      >
        <Tab 
          current = {currentTab}
          changeTab = {(tab: 'stake' | 'reward' | "create-pool") => setCurrentTab(tab)}
        />
        
          {currentTab === tabStates.stake &&
          <Stake
            pools = {stakingPools}
            tokenBalance={parseFloat(lpTokenBalance)}
            handleChange = {inputChange}
            value = {inputValue}
            inputErrMsg = {inputErrMsg}
            tokenAllowance = {parseFloat(lpTokenAllowance)}
            selected = {selectedPool}
            select = {selectPool}
            stake = {stake}
            approve = {approveStake}
            state = {stakeComponentState}
          /> }
          {currentTab === tabStates.reward && <Reward />}

          {currentTab === tabStates.create_pool &&
          <CreatePool
            createPool = {createPool}
            creatorTokenAllowance = {parseFloat(creatorTokenAllowance)}
            value = {100} // hardCoded since the requirement document explicitly specified 100 $CREATOR
            state = {CreatePoolComponentState}
            approve = {approveCreatePool}
          />}
          
      </Box>
    </Box>
  )
}

export default Home
