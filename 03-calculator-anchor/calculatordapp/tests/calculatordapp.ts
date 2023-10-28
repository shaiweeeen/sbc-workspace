import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculatordapp } from "../target/types/calculatordapp";
import { assert } from "chai";

describe("calculatordapp", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Calculatordapp as Program<Calculatordapp>;
  const keyPair = anchor.web3.Keypair.generate();
  const provider = anchor.getProvider();
  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().accounts({
      calculator: keyPair.publicKey,
      signer: provider.publicKey,
      systemProgram : anchor.web3.SystemProgram.programId
    }).signers([keyPair]).rpc();
    console.log("Your transaction signature", tx);
  });
  it("Should add", async () => {

    const num1 = 2;
    const num2 = 1;
   await program.methods.add(new anchor.BN(num1), new anchor.BN(num2)).accounts({
      calculator: keyPair.publicKey,
    }).rpc();
    const calculator = await program.account.calculator.fetch(keyPair.publicKey)
   
    assert.ok(calculator.result.eq(new anchor.BN(num1 + num2)))
  }); 
  it("Should subtract", async () => {

    const num1 = 2;
    const num2 = 1;
   await program.methods.subtract(new anchor.BN(num1), new anchor.BN(num2)).accounts({
      calculator: keyPair.publicKey,
    }).rpc();
    const calculator = await program.account.calculator.fetch(keyPair.publicKey)
   
    assert.ok(calculator.result.eq(new anchor.BN(num1 - num2)))
  }); 
  it("Should multiply", async () => {

    const num1 = 2;
    const num2 = 1;
   await program.methods.multiply(new anchor.BN(num1), new anchor.BN(num2)).accounts({
      calculator: keyPair.publicKey,
    }).rpc();
    const calculator = await program.account.calculator.fetch(keyPair.publicKey)
   
    assert.ok(calculator.result.eq(new anchor.BN(num1 * num2)))
  }); 
  it("Should divide", async () => {

    const num1 = 2;
    const num2 = 1;
   await program.methods.divide(new anchor.BN(num1), new anchor.BN(num2)).accounts({
      calculator: keyPair.publicKey,
    }).rpc();
    const calculator = await program.account.calculator.fetch(keyPair.publicKey)
   
    assert.ok(calculator.result.eq(new anchor.BN(num1 / num2)) && calculator.remainder.eq(new anchor.BN(num1 % num2)))
  }); 
});
