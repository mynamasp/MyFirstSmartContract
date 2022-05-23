//Aim : to update contract message to "goodbye world!"
const { API_KEY,CONTRACT_ADDRESS, PRIVATE_KEY } = process.env;

const { ethers } = require("hardhat");


const contract = require("../artifacts/contracts/helloworld.sol/HelloWorld.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

const signer = new ethers.Wallet(PRIVATE_KEY,alchemyProvider);

const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS,contract.abi,signer);

async function main(){
    const message = await helloWorldContract.message();
    console.log("The original message is : " + message);

    console.log("Updating message.....");
    const tx = await helloWorldContract.update("Goodbye World :-(")
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("The new message is : " +newMessage);

}

main()
.then(()=>process.exit(0))
.catch(error=>{
    console.error(error);
    process.exit(1);
}); 