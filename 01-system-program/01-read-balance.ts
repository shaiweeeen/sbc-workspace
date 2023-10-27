// @solana/web3.js
import * as Web3 from '@solana/web3.js';

async function main() {
    const publicKey = new Web3.PublicKey('9Ub5VdnqnVReicE6hgCfnoChja16ewmGiNTd6C6s8jFC');
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    const balance = await connection.getBalance(publicKey);
    const convertedSol = balance /1000000000;
    console.log(`You have ${balance} Lamports`);
    console.log(`You have ${convertedSol} Sols`);
}

main()