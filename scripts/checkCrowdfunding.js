const hre = require("hardhat");

async function main() {
  const CROWDFUNDING_ADDRESS = "0x6C219a65b721A886072390D13Ad55AD912e35642";
  const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
  const crowdfunding = Crowdfunding.attach(CROWDFUNDING_ADDRESS);

  const provider = hre.ethers.provider;
  const network = await provider.getNetwork();
  console.log("Network:", network);

  try {
    const goal = await crowdfunding.goal();
    const deadline = await crowdfunding.deadline();
    const owner = await crowdfunding.owner();
    console.log("Goal:", goal.toString());
    console.log("Deadline:", deadline.toString());
    console.log("Owner:", owner);
    console.log("Has setDeadline?:", typeof crowdfunding.setDeadline === 'function');
  } catch (err) {
    console.error("Read error:", err);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});