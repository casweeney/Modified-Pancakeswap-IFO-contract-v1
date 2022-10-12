import { ethers } from "hardhat";

const main = async () => {
  // Dai address: 0x6B175474E89094C44Da98b954EedeAC495271d0F
  const [owner, otherAddress] = await ethers.getSigners();
  const offeringAmount = ethers.utils.parseEther("100");
  const raisingAmount = ethers.utils.parseEther("100");

  const Token = await ethers.getContractFactory("PulseToken");
  const token = await Token.deploy();

  await token.deployed();

  console.log("Token Contract deployed to:", token.address);


  const IFO = await ethers.getContractFactory("IFO");
  const ifo = await IFO.deploy();

  await ifo.deployed();

  console.log("IFO Contract deployed to:", ifo.address);

  const currentBlock = await ifo.getCurrentBlock();
  console.log("Current Block", currentBlock);

  const initialize = await ifo.initialize("0x6B175474E89094C44Da98b954EedeAC495271d0F", token.address, offeringAmount, raisingAmount, currentBlock, Number(currentBlock + 14), owner.address);

  console.log("Staking Admin", initialize);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});