// Perform typescript to javascript conversion using

require("dotenv").config()

const ethers = require("ethers")
import { abi as IUniswapV3FactoryABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { create } from "./prisma";

const infura = process.env.INFURA
const mainnet = `https://mainnet.infura.io/v3/54baaa8fd1bf4371b8bea70c7d4bd580`


async function main() {

    const tokenAAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // Mainnet WETH9
    const tokenBAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // Mainnet USDC
    const fee = 500;

    const uniswapV3FactoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984"; // All networks

    // Set up provider
    // console.log("Network:", hre.network.name, "(chainId:", hre.network.config.chainId + ")");
    const provider = new ethers.providers.JsonRpcProvider(mainnet)

    // Set up contracts and interfaces
    const factory = new ethers.Contract(uniswapV3FactoryAddress, IUniswapV3FactoryABI, provider);
    const poolAddress = await factory.getPool(tokenAAddress, tokenBAddress, fee);
    const poolInterface = new ethers.utils.Interface(IUniswapV3PoolABI);
    
    // Set up filter
    const filter = {
	address: poolAddress,
    };
    
    // Listen to event emitted by pool
    console.log("Listening to events emitted by Uniswap V3 pool", poolAddress);
    provider.on(filter, (event: any) => {
        console.log(event)
	    
        create(event["transactionHash"], "WETH9/USDC").catch((e) => {
        throw e
        })
            .finally(async () => {

        })

    });

}

const express = require('express');
const app = express();
main()
const PORT = process.env.PORT || 3000;
app.get('/',(req: any, res: { send: (arg0: string) => any; }) => res.send('Hello World'));

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`))



