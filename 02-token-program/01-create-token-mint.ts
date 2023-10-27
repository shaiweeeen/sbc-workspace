
import "dotenv/config"
import base58 from "bs58"
import * as Web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"

const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"))

const publickey = new Web3.PublicKey("9Ub5VdnqnVReicE6hgCfnoChja16ewmGiNTd6C6s8jFC")
const decoded = base58.decode('388qTuQGp5Xgu8Nt7wR6Dk3igHXJtBrKCMZTd9ChrEmEHDNJVEbnVzoy6qKP4D7vYnVcgJbfdrMD73Q43ZG737NE')
const keyPair = Web3.Keypair.fromSecretKey(decoded)

async function main(){
    const tokenMint = await token.createMint(
        connection,
        keyPair,
        publickey, // mint auth
        publickey, // freeze atuh
        9 //decimals
    )

    console.log(tokenMint.toBase58());
    
}


main();