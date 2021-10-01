import { keccak256, toUtf8Bytes } from "ethers/lib/utils";

export const CRYPTO_CRITTER_TOKEN_ROLES = {
  MINTER_ROLE: keccak256(toUtf8Bytes("MINTER_ROLE")),
  URI_SETTER_ROLE: keccak256(toUtf8Bytes("URI_SETTER_ROLE")),
  PAUSER_ROLE: keccak256(toUtf8Bytes("PAUSER_ROLE")),
  UPGRADER_ROLE: keccak256(toUtf8Bytes("UPGRADER_ROLE")),
};
