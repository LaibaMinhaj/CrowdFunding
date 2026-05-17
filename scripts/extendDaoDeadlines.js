const hre = require("hardhat");

async function main() {
  const { DAO_ADDRESS } = require("../frontend/src/config");
  const DAO = await hre.ethers.getContractFactory("DAO");
  const dao = DAO.attach(DAO_ADDRESS);

  console.log("Extending all DAO proposal deadlines to one hour from now...");
  const tx = await dao.extendAllDeadlines();
  await tx.wait();

  console.log("All DAO proposal deadlines extended.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
