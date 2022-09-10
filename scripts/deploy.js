
const hre = require("hardhat");

async function main() {

  const BuyContractFactory = await ethers.getContractFactory("BuyMeACoffee");
  const CoffeeContract = await BuyContractFactory.deploy();
  await CoffeeContract.deployed();

  console.log(`Buy Me A Coffee Contract Deployed to ${CoffeeContract.address}`)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
