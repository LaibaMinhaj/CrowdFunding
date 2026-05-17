const hre = require("hardhat");

async function main() {
  const goal = hre.ethers.parseEther("10");
  const targetDate = new Date("2026-05-20T00:00:00Z");
  const targetTimestamp = Math.floor(targetDate.getTime() / 1000);
  const nowTimestamp = Math.floor(Date.now() / 1000);
  const duration = targetTimestamp - nowTimestamp;

  if (duration <= 0) {
    throw new Error("Target deadline must be in the future.");
  }

  const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
  const crowdfunding = await Crowdfunding.deploy(goal, duration);
  await crowdfunding.waitForDeployment();

  console.log("Crowdfunding deployed to:", await crowdfunding.getAddress());
  console.log("Goal:", goal.toString(), "wei");
  console.log("Target deadline:", targetDate.toUTCString());
  console.log("Duration (seconds):", duration);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});