import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { type NextPage } from "next";
import Head from "next/head";
import * as React from 'react';

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = React.useState("");
  const [network, setNetwork] = React.useState('');

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
              <MenuItem value={'networkOne'}>Network 1</MenuItem>
              <MenuItem value={'networkTwo'}>Network 2</MenuItem>
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
            <Button className=" bg-blue-600 self-center ml-3" variant="contained" color="primary">Get Balance</Button>
          </div>

          <div className=" self-center mt-5 rounded-md border p-4 ">
            Native Balance: 0.00
          </div>
        </form>
      </main>
    </>
  );
};

export default Home;
