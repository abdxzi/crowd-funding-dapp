const hre= require("hardhat");
const ERC20_ABI = require("./abi/ERC20.json")

const deploy_contract = async (name, arguments) => {
    const contract = await hre.ethers.deployContract(name, arguments, {});
    await contract.waitForDeployment();
    console.log(`${name} deployed at ${contract.target}`)

    return contract;
}

const ETH_balanceof = async (provider, address) => {
    const balance = await provider.getBalance(address);
    console.log(`Balance of ${address} is  ${ethers.formatEther(balance)} ETH.`);
}

const ETH_transfer = async (signer, _to, _amount) => {
    const transaction = await signer.sendTransaction({
        to: _to,
        value: hre.ethers.parseEther(_amount),
    });
    transaction.wait();
}

const ERC20_balanceof = async (provider, token, address) => {
    const contract = new hre.ethers.Contract(token.address, ERC20_ABI, provider);
    const balance = await contract.balanceOf(address);
    const amount = hre.ethers.formatUnits(balance, token.decimals)

    console.log(`${token.name} Balance of ${address} is `, amount);
}

const ERC20_approve = async (signer, token, spender, amount) => {
    const contract = new hre.ethers.Contract(token.address, ERC20_ABI, signer);
    const _amount = hre.ethers.parseUnits(amount, token.decimals);
    await contract.approve(spender, _amount);

    console.log(`Approving ${spender} to use`, _amount, token.symbol);
}

const ERC20_allowance = async (provider, token, owner, spender) => {
    const contract = new hre.ethers.Contract(token.address, ERC20_ABI, signer);
    const amount = await contract.getAllowance(owner, spender);
    const _amount = hre.ethers.formatUnits(amount, token.decimals);

    console.log(`Allowance of ${spender} is`, _amount, token.symbol);
}

module.exports = {
    deploy_contract,
    // estimate_deployment_cost,
    ETH_balanceof,
    ETH_transfer,
    ERC20_balanceof,
    ERC20_approve,
    ERC20_allowance,
}