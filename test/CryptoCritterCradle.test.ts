import { ethers, upgrades, waffle } from "hardhat";
import { expect } from "chai";
import { CryptoCritterCradle, CryptoCritterToken } from "../typechain";
import { arrayify, formatBytes32String, keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { CRYPTO_CRITTER_CRADLE_ROLES, CRYPTO_CRITTER_TOKEN_ROLES } from "./constants";

describe("CryptoCritterCradle", () => {
  const { WITHDRAW_ROLE, UPGRADER_ROLE, PAUSER_ROLE } = CRYPTO_CRITTER_CRADLE_ROLES;

  async function fixture() {
    const tokenFactory = await ethers.getContractFactory("CryptoCritterToken");
    const cryptoCritterToken = (await upgrades.deployProxy(tokenFactory)) as CryptoCritterToken;
    const token = await cryptoCritterToken.deployed();
    const cradleFactory = await ethers.getContractFactory("CryptoCritterCradle");
    const cryptoCritterCradle = (await upgrades.deployProxy(cradleFactory, [token.address])) as CryptoCritterCradle;
    const cradle = await cryptoCritterCradle.deployed();
    await token.grantRole(CRYPTO_CRITTER_TOKEN_ROLES.MINTER_ROLE, cradle.address);
    const signers = await ethers.getSigners();
    const [owner] = signers;
    return { token, cradle, owner, signers };
  }

  it("should be deployed.", async function () {
    const { cradle } = await waffle.loadFixture(fixture);
    expect(await cradle.version()).to.equal("1.0");
  });

  it("should be able to create a CryptoCritter", async function () {
    const { cradle, owner, token } = await waffle.loadFixture(fixture);
    await cradle.createCritter(owner.address, 1, 1, []);
    expect(await token.balanceOf(owner.address, 1)).to.equal(1);
  });

  it("should not be able to create a CryptoCritter when paused", async function () {
    const { cradle, owner, token } = await waffle.loadFixture(fixture);
    await cradle.pause();
    expect(cradle.createCritter(owner.address, 1, 1, [])).to.be.reverted;
    expect(await token.balanceOf(owner.address, 1)).to.equal(0);
  });
});
