import { defaultConfig } from '@web3modal/ethers'

/* 
  WEB3MODAL CONFIGURATION HELPERS 
*/

// Get projectId
export const projectId = 'd2018a62095ce4f319d5854857cfce2f'

// Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://acc-swap.vercel.app', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// Create Ethers config
export const ethersConfig = defaultConfig({
  metadata,
});