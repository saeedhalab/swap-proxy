const { ethers } = require("hardhat");

async function main() {
  const SwapProxy = await ethers.getContractFactory("SwapProxy");
  const swapProxy = await SwapProxy.deploy(
    "0xE592427A0AEce92De3Edee1F18E0157C05861564"
  );
  console.log("SwapProxy contract is deployed successfull", swapProxy.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
