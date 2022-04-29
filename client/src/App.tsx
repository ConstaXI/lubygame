import { useState, useEffect } from 'react';
import './App.css';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils'
import json from './contracts/LubyGame.json';
import useWeb3 from './hooks/web3';

const App = () => {
  const { isLoading, isWeb3, web3, accounts } = useWeb3();
  const [instance, setInstance] = useState<Contract>();

  const abi = json.abi;

  useEffect(() => {
    (async () => {
      if (web3 !== null) {
        const deployedNetwork = json.networks["5777"];
        const instance = new web3.eth.Contract(
          abi as AbiItem[],
          deployedNetwork && deployedNetwork.address
        );
        setInstance(instance);
      }
    })()
  }, [abi, accounts, isLoading, isWeb3, web3]);

  const handleDonate = async () => {
    await instance?.methods.mintLbc("1000000000000000000").send({ from: accounts[0] })
  }

  return (
    <div className="App">
      {isLoading ? <div>Loading Web3, accounts, and contract...</div>
        : isWeb3 ?
          <div>
            <h1>Luby Game</h1>
            <button>start</button>
            <button onClick={handleDonate}>donate</button>
            <p>aaa</p>
          </div>
          : <div>
            <p>none web3</p>
          </div>
      }
    </div>
  );
}

export default App;