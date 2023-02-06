import { type NextPage } from "next";
import Head from "next/head";
import { SequenceIndexerClient, type TokenBalance } from '@0xsequence/indexer';
import * as React from 'react';
import Button from "@mui/material/Button";
import { Divider, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import Image from "next/image";
import { BigNumber, ethers } from "ethers";

const Home: NextPage = () => {
  const [balances, setBalances] = React.useState<TokenBalance[]>([]);
  const [walletAddress, setWalletAddress] = React.useState("");
  const [network, setNetwork] = React.useState('https://mainnet-indexer.sequence.app');
  const [nativeBalance, setNativeBalance] = React.useState("");

  // Gets the wallet token and native balances and loads it in the state
  const getWalletBalances = async () => {
    const indexer = new SequenceIndexerClient(network);

    const tokenBalances = await indexer.getTokenBalances({
      accountAddress: walletAddress,
      includeMetadata: true
    });

    const balance = await indexer.getEtherBalance({
      accountAddress: walletAddress,
    });

    setBalances(tokenBalances.balances);
    setNativeBalance((+ethers.utils.formatEther(BigNumber.from(balance.balance.balanceWei))).toFixed(4));
  }

  // takes a string and returns the first 5 and last 4 characters to shorten the string
  const shortenAddress = (address: string) => {
    const firstChunk = address.slice(0, 5);
    const secondChunk = address.slice(38, 42);
    return firstChunk + "..." + secondChunk;
  };

  const imageTypeUrl = (contractType: string) => {
    switch (contractType) {
      case "ERC20":
        return "/ERC20.png"
      case "ERC721":
        return "/ERC721.png"
      case "ERC1155":
        return "/ERC1155.png"
      default:
        return "/OTHER.png"
    }
  };

  return (
    <>
      <Head>
        <title>Sequence Indexer</title>
        <meta name="description" content="Sequence indexer demo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center bg-gradient-to-b to-[#000006] from-[#00498b] min-h-screen max-h-full">
        <h1 className="mb-4 text-4xl font-extrabold leading-none text-white">
          Wallet Balances
        </h1>

        <form className=' bg-white rounded-lg p-6 flex flex-col'>
          <FormControl fullWidth className="mb-5">
            <InputLabel id="simple-select">Network</InputLabel>
            <Select
              labelId="simple-select"
              id="simple-select"
              value={network}
              label="Network"
              onChange={(selected) => setNetwork(selected.target.value)}
            >
              {/* This are all the networks available in sequence https://status.sequence.info/*/}
              <MenuItem value={'https://mainnet-indexer.sequence.app'}>Ethereum Mainnet</MenuItem>
              <MenuItem value={'https://polygon-indexer.sequence.app'}>Polygon</MenuItem>
              <MenuItem value={'https://arbitrum-indexer.sequence.app'}>Arbitrum One</MenuItem>
              <MenuItem value={'https://bsc-indexer.sequence.app'}>Arbitrum Nova</MenuItem>
              <MenuItem value={'https://optimism-indexer.sequence.app'}>Optimism</MenuItem>
              <MenuItem value={'https://bsc-indexer.sequence.app'}>BSC chain</MenuItem>
              <MenuItem value={'https://avalanche-indexer.sequence.app'}>Avalanche</MenuItem>
              <MenuItem value={'https://gnosis-indexer.sequence.app'}>Gnosis</MenuItem>
              <MenuItem value={'https://goerli-indexer.sequence.app'}>Goerli (Testnet)</MenuItem>
              <MenuItem value={'https://mumbai-indexer.sequence.app'}>Mumbai (Testnet)</MenuItem>
              <MenuItem value={'https://bsc-testnet-indexer.sequence.app'}>BSC (Testnet)</MenuItem>
            </Select>
          </FormControl>
          <div className="flex">
            <TextField
              id="outlined-basic"
              label="Wallet Address"
              variant="outlined"
              style={{ backgroundColor: 'white' }}
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            <Button className=" bg-blue-600 self-center ml-3" variant="contained" color="primary" onClick={() => { void getWalletBalances() }}>Get Balance</Button>
          </div>

          <div className=" self-center mt-5 rounded-md border p-4 ">
            Native Balance: {nativeBalance}
          </div>
        </form>
        <div className="grid grid-cols-4 gap-2">
          {balances.length != 0 ?
            (balances.map((balance) => (
              <Paper key={balance.contractAddress} elevation={8} className='p-5 m-5'>

                <div className="h-64 w-64 relative">
                  <Image
                    src={imageTypeUrl(balance.contractType)}
                    alt="Contract Type image"
                    layout="fill" // required
                    className="" // just an example
                  />
                </div>

                <Divider className="my-4" />

                <div className=" max-w-sm">
                  <div>
                    Address: {shortenAddress(balance.contractAddress)}
                  </div>
                  <div>
                    balance: {balance.balance.slice(0, 9)}
                  </div>
                  <div >
                    name: {balance.contractInfo ? balance.contractInfo.name.slice(0, 30) : "Undefined"}
                  </div>
                </div>
              </Paper>
            ))
            ) :
            null
          }
        </div>
      </main>
    </>
  );
};

export default Home;
