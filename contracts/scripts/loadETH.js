const { ethers } = require("hardhat");

async function sendETH() {
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

    const recipientAddress = "0x838022424e339deC8f4EF15886e360ccA5ad992A"

    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(ethers.provider);
   
    const amountInEther = '10.0'; 
    const amountInWei = ethers.parseEther(amountInEther);
   
    const transaction = await signer.sendTransaction({
       to: recipientAddress,
       value: amountInWei,
    });
    
   
    console.log(`Sent ${amountInEther} ETH, from: ${wallet.address} to: ${recipientAddress}`);
    console.log(`Transaction hash: ${transaction.hash}`);
   }
   
   sendETH();