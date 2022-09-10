import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import './App.css';
import contractAbi from "./utils/contractAbi.json";


function App() {
  const [activeAccount, setActiveAccount] = useState("")
  const [message, setMessage] = useState("")

  const CONTRACT_ADDRESS ="0x5FbDB2315678afecb367f032d93F642f64180aa3"

  const connectWallet = async () => {
    try{
      const {ethereum} = window;

      if(!ethereum){
        alert("Please install MetaMask")
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"})
      setActiveAccount(accounts[0])
      console.log("Connected to: ", accounts[0])

    }catch(error){
      console.log(error)
    }
  }

  const checkIfWalletIsConnect = async () =>{
    const {ethereum} = window;

    if(!ethereum){
      alert("Please install MetaMask")
      return;
    } else {
      console.log("Ethereum Object Found")
    }
    const accounts = await ethereum.request({method: "eth_accounts"})
    if(accounts.length !== 0){
      setActiveAccount(accounts[0])
    } else{
      console.log("No authorized account")
    }

  }
  

  const buyCoffeeFunction = async () => {
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const CoffeeContract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

        console.log("Loading MetaMask to pay for gas")

        let txn = await CoffeeContract.buyCoffee(message, {value: "2000000000000000000"})
        let receipt = await txn.wait()

      }

    }catch(error){
      console.log(error)
    }
   

  }

  useEffect(()=>{
    checkIfWalletIsConnect();
  },[])


  return (
    <div className="App">
    <div>
      <div>
        <button onClick={connectWallet}>Connect Wallet</button>
      </div>
    </div>
    <div>
      <div>
        <h1>Buy Me A Coffee</h1>
      </div>
    </div>
      <div>
        <div>
          <h4>Buy a coffee here!</h4>
          <input onChange={(e)=>setMessage(e.target.value)} type="text" placeholder='Write A Message!' />
          <button>Buy coffee</button>
        </div>
      </div>
    </div>
  );
}

export default App;
