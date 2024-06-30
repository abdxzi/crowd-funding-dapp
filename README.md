<div style="display:flex; justify-content:center; gap: 10px">
<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
<img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" />
<img src="https://files.readme.io/51627ed-image.png" height="30px" />
<img src="https://a11ybadges.com/badge?logo=ipfs" />
</div>

# Crowd Funding dApp

This is a decentralised application created in React for Crowd Funding of Web3 Projects. In this app anyone can create crowd funding campaigns and collect fund in ETHEREUM with complete transparency and security.

App Frontend is in `ReactJS` and contracts are written in `solidity` and tested with `hardhat`. `IPFS` (InterPlanetary File System) is used to store the campaign meta data. For fast client side data fetching ipfs cid of campaigns are storted in `Supabase`

This project is created for Alchemy Ethereum bootcamp.


## Video
https://github.com/abdxzi/crowd-funding-dapp/assets/41392849/570e7e46-f3db-47eb-9444-9d8b6eb53490



## Live Demo
<a href="https://crowd-funding-dapp-eta.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" /></a>

Contracts are deployed in Sepolia Testnet at: `0xA840114c4c7B1f8aaF19c5f6e005A89F8853262a`

## Features

✔️ Create Crowd Funding Camapaigns <br>
✔️ Collect Fund in ETH from donors <br>
✔️  Edit Campaign Metadata <br>
✔️  See withdrawal History <br>

## Getting Started

1. Clone this project, `cd` into project root directory
2. `pnpm install` to download all the project dependencies.
3. Create an empty `.env` file in root directory.
4. Run `pnpm run dev` to start the app

```
VITE_RPC_URL=
VITE_CONTRACT_ADDRESS=
VITE_PINATA_JWT=
VITE_IPFS_GATEWAY=
VITE_SUPABASE_PROJECT=
VITE_SUPABASE_ANON_KEY=
```

## Local testnet
You can use `hardhat node` to test the dapp locally. Hardhat and contracts are present in `fork` directory.

1. Uncomment the hardhat network at `src\config\modalNetworks.js`
2. Add hardhat to Browser Wallet.
3. Insytall dependencies `cd fork && pnpm install`
4. Start local testnet using `npx hardhat node`
5. Update `.env`
6. Use `fork/scripts` for deployment and testing

**⚠️ Note**

> Never put sensitive piece of data in client side. If we were\
> building an enterprise app to conquer the world we would never place\
> this sensitive data in the client code of our blockexplorer project that\
> could potentially be read by anyone.
