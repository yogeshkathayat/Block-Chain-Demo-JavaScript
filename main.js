
var crypto = require('crypto-js');

// a block containing index,timestamp,data,previousHash,hash as fields
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    //function to calculate hash using crypto
    calculateHash() {
        return crypto.SHA256(this.index + this.previousHash+this.timestamp + JSON.stringify(this.data)).toString();

    }

}


//blockchain chain containing blocks
class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    //function to create genesis block
    createGenesisBlock() {
        return new Block(0, "20/02/2018", "this is genesis block", "0");
    }
    //function to get latest block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];

    }
    //function to add new block into the blockchain
    addBlock(newBlock) {

        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

        }
        return true;
    }
}

// initializing new blockchain
let myblockchain = new BlockChain();


//adding some dummy blocks
myblockchain.addBlock(new Block(1, "21/02/2018", { amount: 4 }));
myblockchain.addBlock(new Block(2, "22/02/2018", { amount: 40 }));
myblockchain.addBlock(new Block(3, "23/02/2018", { amount: 10 }));

console.log("is blockchain valid?", myblockchain.isChainValid());


//tempering 1 block in the chain
myblockchain.chain[1].data = {amount: 100};

console.log("is blockchain valid?", myblockchain.isChainValid())

console.log(JSON.stringify(myblockchain, null, 4));















