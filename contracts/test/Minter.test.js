const { expect } = require("chai");

const Minter = artifacts.require("Minter");
const WrappedToken = artifacts.require("WrappedToken");

const ZERO_HASH =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

function fixSignature(signature) {
  // in geth its always 27/28, in ganache its 0/1. Change to 27/28 to prevent
  // signature malleability if version is 0/1
  // see https://github.com/ethereum/go-ethereum/blob/v1.8.23/internal/ethapi/api.go#L465
  let v = parseInt(signature.slice(130, 132), 16);
  if (v < 27) {
    v += 27;
  }
  const vHex = v.toString(16);
  return signature.slice(0, 130) + vHex;
}

async function generateSignature(data, acc) {
  return fixSignature(await web3.eth.sign(data, acc));
}

async function generateSignatures(data, accs) {
  let ordered = accs.sort();
  let signatures = [];
  for await (const acc of ordered) {
    signatures.push(await generateSignature(data, acc));
  }
  return signatures;
}

contract("Minter", async ([operator, ant, whale, abuser]) => {
  let minter;
  let tknA;
  let tknB;

  beforeEach(async () => {
    minter = await Minter.new(2, 0, [operator, ant, whale], { from: operator });

    tknA = await WrappedToken.new("Test Token A", "TKNA", { from: operator });
    await tknA.transferOwnership(minter.address, { from: operator });

    tknB = await WrappedToken.new("Test Token B", "TKNB", { from: operator });
  });

  describe("#verify", () => {
    it("works correctly", async () => {
      const nonce = await minter.nonce();
      const data = web3.utils.soliditySha3(nonce.toString(), ZERO_HASH);

      let signatures;

      // ok
      signatures = await generateSignatures(data, [operator, ant, whale]);
      expect(await minter.verify(data, signatures)).to.be.true;

      // no
      signatures = [];
      for await (const acc of [operator, ant, whale]) {
        signatures.push(await generateSignature(data, acc));
      }
      expect(await minter.verify(data, signatures)).to.be.false;

      // no
      signatures = await generateSignatures(data, [operator]);
      expect(await minter.verify(data, signatures)).to.be.false;

      // no
      signatures = await generateSignatures(data, [operator, abuser]);
      expect(await minter.verify(data, signatures)).to.be.false;
    });
  });
});
