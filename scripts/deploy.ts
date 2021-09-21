import { upgrades, ethers } from "hardhat";
import {CryptoCritterToken, CryptoCritterToken__factory} from "../typechain";

async function main() {
  const name = "CryptoCritterToken";
  const factory: CryptoCritterToken__factory = await ethers.getContractFactory(name);
  const contract: CryptoCritterToken = <CryptoCritterToken>await upgrades.deployProxy(factory, { kind: "uups" });
  console.log(`Deployed ${name} at ${contract.address}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
