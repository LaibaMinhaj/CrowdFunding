const hre = require("hardhat");

async function main() {
  const { DAO_ADDRESS, TOKEN_ADDRESS } = require("../frontend/src/config");
  const DAO = await hre.ethers.getContractFactory("DAO");
  const dao = DAO.attach(DAO_ADDRESS);
  const provider = hre.ethers.provider;
  const network = await provider.getNetwork();
  console.log("Network:", network);

  const countBN = await dao.getProposalsCount();
  const count = Number(countBN);
  console.log("Proposal count:", count);
  for (let i = 0; i < count; i++) {
    const p = await dao.proposals(i);
    const description = p.description;
    const voteCount = p.voteCount.toString();
    const deadline = p.deadline.toString();
    const executed = p.executed;
    const now = Math.floor(Date.now() / 1000);
    console.log(`Proposal ${i}: desc=${description}, votes=${voteCount}, deadline=${deadline}, now=${now}, ended=${now >= Number(deadline)}, executed=${executed}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});