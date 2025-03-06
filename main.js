import { ethers } from "./ethers-5.1.esm.min.js";
import { abi, contractAddress } from "./constants/constamts.js";

const connectBtn = document.querySelector("#connectBtn");
const incrementBtn = document.querySelector("#incrementBtn");
const counter = document.querySelector("#counter");

// Connect function
const connectfunc = async () => {
  try {
    console.log("connecting");
    // console.log(typeof window.ethereum);
    if (typeof window.ethereum !== "undefined") {
      // check if metamask is installed
      // console.log("Wallet Exists");
      await window.ethereum.request({ method: "eth_requestAccounts" }); // connect to metamask
      connectBtn.innerHTML = "Connected!"; // change button text
      connectBtn.disabled = true;
      console.log("connected");
      getCounterFunc();
    }
  } catch (error) {
    console.log(error);
  }
};

// Increment function
const Incrementfunc = async () => {
try {
  if (typeof window.ethereum !== "undefined") {
    // check if metamask is installed
    console.log("Incrementing");
    // Step 1: Create a provider to interact with the contract/Ethereum
    // console.log("provider");

    const provider = new ethers.providers.Web3Provider(window.ethereum); // create a provider
    // console.log(provider);
    // Step 2: Get the signer(The connected user's wallet)
    const signer = provider.getSigner(); // get signer(auth)
    // console.log(signer);

    // Step 3: Connect ourself to the contract
    const contract = new ethers.Contract(contractAddress, abi, signer); // connect to the contract
    console.log(contract);

    // Step 4: Call the increaseCount function in the contract
    const tx = await contract.increaseCount(); // call the increaseCount function
    console.log(tx);
   await getCounterFunc();
  }
} catch (error) {
  console.log(error);
}
};

const getCounterFunc = async () => {
  console.log("sddsdsdsd");
  
  if (typeof window.ethereum !== "undefined") {
    // check if metamask is installed
    console.log("Getcount");
    // Step 1: Create a provider to interact with the contract/Ethereum
    // console.log("provider");

    const provider = new ethers.providers.Web3Provider(window.ethereum); // create a provider
    // console.log(provider);
    // Step 2: Get the signer(The connected user's wallet)
    const signer = provider.getSigner(); // get signer(auth)
    // console.log(signer);

    // Step 3: Connect ourself to the contract
    const contract = new ethers.Contract(contractAddress, abi, signer); // connect to the contract
    console.log(contract);

    // Step 4: Call the increaseCount function in the contract
    const count = await contract.getCounter(); // call the increaseCount function

    // Step 5: Display the count
    counter.innerHTML = Number(count);
    console.log(Number(count));
  }

}


connectBtn.addEventListener("click", connectfunc);
incrementBtn.addEventListener("click", Incrementfunc);
