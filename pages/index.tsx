import { Box, Button, IconWallet, Skeleton, Stack, Text } from 'degen'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Box
      as='div'
      backgroundColor="accentSecondary"
      height="16"
      borderRadius="none"
      padding="1.5"
      borderBottomWidth="1"
      borderColor="teal"
      className = {styles.header}
    >
      <Stack
        direction="horizontal"
        as = "header"
        align="center"
        justify="space-between"
      >
        <Text
          as = "span"
          weight="bold"
          size = "headingTwo"
          color="current"
        >
            Coinvise
          <Text 
            as = "span"
            weight= "light"
            color = "teal"
          >
            Staking
          </Text>
        </Text>

        <Button
          // disabled={getState('loading')}
          // loading={getState('loading')}
          size="small"
          prefix={<IconWallet />}
          tone="blue"
          variant="primary"
          onClick={() => {
            // toggleState('loading')
            // setTimeout(() => toggleState('loading'), 1000)
          }}
        >
          Connect Wallet
        </Button>
      </Stack>
    </Box>
  )
}

export default Home
