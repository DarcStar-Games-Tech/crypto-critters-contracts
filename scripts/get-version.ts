import { ethers } from "hardhat";

async function main() {
  const name = "CryptoCritterToken";
  const { ADDRESS } = process.env;
  console.log(`Address: ${ADDRESS}`);
  if (ADDRESS) {
    const contract = await ethers.getContractFactory(name).then(f => f.attach(ADDRESS));
    const version = await contract.version();
    console.log(`Version of ${name} at ${contract.address} is ${version}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
