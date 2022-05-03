import BN from "bn.js";
import { Amount } from "../../shared/Amount";
import { Button } from "../../shared/Button";
import { useState, useEffect } from "react";
import { Contract } from "web3-eth-contract";

interface IProps {
  instance?: Contract;
  accounts: string[];
  contractAddress: string;
}

const WithDraw = (props: IProps) => {
  const [contractBalance, setContractBalance] = useState(new BN("0"));

  const { instance, accounts, contractAddress } = props;

  useEffect(() => {
    (async () => {
      const contractBalanceResponse = await instance?.methods
        .balanceOf(contractAddress)
        .call({ from: accounts[0] });

      setContractBalance(new BN(contractBalanceResponse));
    })();
  }, [accounts, contractAddress, instance?.methods]);

  const handleWithdraw = async () => {
    await instance?.methods.withdraw().send({ from: accounts[0] });

    setContractBalance(new BN("0"));
  };

  return (
    <Amount>
      <p>Contrato</p>
      <strong>
        {contractBalance.div(new BN("1000000000000000000")).toString()} LBC
      </strong>
      <Button onClick={handleWithdraw}>withdraw</Button>
    </Amount>
  );
};

export default WithDraw;
