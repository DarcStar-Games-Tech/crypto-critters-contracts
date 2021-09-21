import { ethers, upgrades } from "hardhat";

async function main() {
  const name = "CryptoCritterToken";
  const { ADDRESS } = process.env;
  if (ADDRESS) {
    const factory = await ethers.getContractFactory(name);
    const contract = await upgrades.upgradeProxy(ADDRESS, factory);
    console.log(`Upgraded ${name} at ${contract.address}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
