import './App.css';


function App() {

  const connectWallet = async () => {
    try{
      const {ethereum} = window;
      if(ethereum){
        
      }

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

  }


  return (
    <div className="App">
    <div>
      <div>
        <h1>Buy Me A Coffee</h1>
      </div>
    </div>
      <div>
        <div>
          <h4>Buy a coffee here!</h4>
          <button>Buy coffee</button>
        </div>
      </div>
    </div>
  );
}

export default App;
