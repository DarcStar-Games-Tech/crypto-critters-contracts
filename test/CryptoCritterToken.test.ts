import { ethers, upgrades, waffle } from "hardhat";
import { expect } from "chai";
import { CryptoCritterToken } from "../typechain";

describe("CryptoCritterToken", () => {
  async function fixture() {
    const CryptoCritterTokenContractFactory = await ethers.getContractFactory("CryptoCritterToken");
    const cryptoCritterToken = (await upgrades.deployProxy(CryptoCritterTokenContractFactory)) as CryptoCritterToken;

    return await cryptoCritterToken.deployed();
  }
  it("should be version 1.0", async function () {
    const cryptoCritterToken = await waffle.loadFixture(fixture);
    expect(await cryptoCritterToken.version()).to.equal("1.0");
  });
  it("should be able to mint an NFT", async function () {
    const cryptoCritterToken = await waffle.loadFixture(fixture);
    const [owner] = await ethers.getSigners();
    await cryptoCritterToken.mint(owner.address, 1, 1, []);
    expect(await cryptoCritterToken.balanceOf(owner.address, 1)).to.equal(1);
    expect(await cryptoCritterToken.balanceOf(owner.address, 2)).to.equal(0);
  });
  it("should not have an NFT that has not been minted", async function () {
    const [owner] = await ethers.getSigners();
    const cryptoCritterToken = await waffle.loadFixture(fixture);
    await cryptoCritterToken.mint(owner.address, 1, 1, []);
    expect(await cryptoCritterToken.balanceOf(owner.address, 2)).to.equal(0);
  });
  it("should be able to mint an NFT for any provided address", async function () {
    const [owner, address1] = await ethers.getSigners();
    const cryptoCritterToken = await waffle.loadFixture(fixture);
    await cryptoCritterToken.mint(address1.address, 1, 1, []);
    expect(await cryptoCritterToken.balanceOf(address1.address, 1)).to.equal(1);
  });
  it("any address should not be able to mint an NFT for any provided address", async function () {
    const [owner, address1] = await ethers.getSigners();
    const cryptoCritterToken = await waffle.loadFixture(fixture);
    await expect(cryptoCritterToken.connect(address1).mint(address1.address, 1, 1, [])).to.be.reverted;
    expect(await cryptoCritterToken.balanceOf(address1.address, 1)).to.equal(0);
  });
});
