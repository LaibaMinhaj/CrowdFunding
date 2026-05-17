const hre = require("hardhat");

async function main() {
  const CROWDFUNDING_ADDRESS = "0x6C219a65b721A886072390D13Ad55AD912e35642"; // update if needed
  const targetDate = new Date("2026-05-20T00:00:00Z");
  const targetTimestamp = Math.floor(targetDate.getTime() / 1000);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Using deployer:", deployer.address);
  console.log("Setting deadline to:", targetDate.toUTCString());

  const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
  const crowdfunding = Crowdfunding.attach(CROWDFUNDING_ADDRESS);

  const tx = await crowdfunding.connect(deployer).setDeadline(targetTimestamp);
  await tx.wait();

  console.log("Deadline updated to", targetTimestamp, "(May 20 2026 UTC).");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});