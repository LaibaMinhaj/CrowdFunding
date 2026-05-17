const hre = require("hardhat");

async function main() {

  // 1. Deploy RewardToken
  const RewardToken = await hre.ethers.getContractFactory("RewardToken");

  const token = await RewardToken.deploy();
  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  console.log("RewardToken deployed to:", tokenAddress);

  // 2. Deploy DAO (PASS TOKEN ADDRESS)
  const DAO = await hre.ethers.getContractFactory("DAO");

  const dao = await DAO.deploy(tokenAddress); // 🔥 IMPORTANT FIX
  await dao.waitForDeployment();

  console.log("DAO deployed to:", await dao.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});