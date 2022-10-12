import { ethers } from "hardhat";

const main = async () => {
  const Token = await ethers.getContractFactory("PulseToken");
  const token = await Token.deploy();

  await token.deployed();

  console.log("Staking Contract deployed to:", token.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});