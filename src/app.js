"use strict";
// Perform typescript to javascript conversion using
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const ethers = require("ethers");
const IUniswapV3Factory_json_1 = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json");
const IUniswapV3Pool_json_1 = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const prisma_1 = require("./prisma");
const infura = process.env.INFURA;
const mainnet = `https://mainnet.infura.io/v3/54baaa8fd1bf4371b8bea70c7d4bd580`;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenAAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // Mainnet WETH9
        const tokenBAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // Mainnet USDC
        const fee = 500;
        const uniswapV3FactoryAddress = "0x1F98431c8aD98523631AE4a59f267346ea31F984"; // All networks
        // Set up provider
        // console.log("Network:", hre.network.name, "(chainId:", hre.network.config.chainId + ")");
        const provider = new ethers.providers.JsonRpcProvider(mainnet);
        // Set up contracts and interfaces
        const factory = new ethers.Contract(uniswapV3FactoryAddress, IUniswapV3Factory_json_1.abi, provider);
        const poolAddress = yield factory.getPool(tokenAAddress, tokenBAddress, fee);
        const poolInterface = new ethers.utils.Interface(IUniswapV3Pool_json_1.abi);
        // Set up filter
        const filter = {
            address: poolAddress,
        };
        // Listen to event emitted by pool
        console.log("Listening to events emitted by Uniswap V3 pool", poolAddress);
        provider.on(filter, (event) => {
            console.log(event);
            (0, prisma_1.create)(event["transactionHash"], "WETH9/USDC").catch((e) => {
                throw e;
            })
                .finally(() => __awaiter(this, void 0, void 0, function* () {
            }));
        });
    });
}
const express = require('express');
const app = express();
main();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Hello World'));
app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
