import * as Web3 from '@solana/web3.js';
import base58 from 'bs58'

async function main() {
    const decoded = base58.decode('388qTuQGp5Xgu8Nt7wR6Dk3igHXJtBrKCMZTd9ChrEmEHDNJVEbnVzoy6qKP4D7vYnVcgJbfdrMD73Q43ZG737NE')
    const keyPair = Web3.Keypair.fromSecretKey(decoded)

    const publicKeyFrom = new Web3.PublicKey('9Ub5VdnqnVReicE6hgCfnoChja16ewmGiNTd6C6s8jFC');
    const publicKeyTo = new Web3.PublicKey('6sLQySwobQ32JxisSxfSxxVkFaRfBd5K8aezKEYtEHyE');

    const instruction = Web3.SystemProgram.transfer({
        fromPubkey: publicKeyFrom,
        toPubkey: publicKeyTo,
        lamports: 2,
    });
    const transaction = new Web3.Transaction();
    transaction.add(instruction);

    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const txSignature = await Web3.sendAndConfirmTransaction(connection, transaction, [keyPair]);

    console.log('txHash', txSignature)
}

main();