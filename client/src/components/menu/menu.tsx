import BN from "bn.js";
import { useState, useEffect } from "react";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import json from "../../contracts/LubyGame.json";
import useWeb3 from "../../hooks/web3";
import { Amount } from "../../shared/Amount";
import { Button, ButtonContainer } from "../../shared/Button";
import Game from "../game/game";
import WithDraw from '../owner/withdraw';
import {
  Container,
  Options,
  OptionsContainer,
  StyledTextField,
} from "./styles";

const Menu = () => {
  const { isLoading, isWeb3, web3, accounts } = useWeb3();
  const [instance, setInstance] = useState<Contract>();
  const [amount, setAmount] = useState(new BN("0"));
  const [betValue, setBetValue] = useState(new BN("0"));
  const [gameStatus, setGameStatus] = useState(
    localStorage.getItem("gameStatus") === "true"
  );
  const [isOwner, setIsOwner] = useState(false);

  const abi = json.abi;
  const deployedNetwork = json.networks["5777"];

  useEffect(() => {
    (async () => {
      if (web3 !== null) {
        const we3Instance = new web3.eth.Contract(
          abi as AbiItem[],
          deployedNetwork && deployedNetwork.address
        );
        setInstance(we3Instance);

        const [amount, owner] = await Promise.all([
          we3Instance.methods
            .balanceOf(accounts[0])
            .call({ from: accounts[0] }) as string,
          we3Instance.methods.owner().call({ from: accounts[0] }) as string,
        ]);

        setIsOwner(owner.toLowerCase() === accounts[0].toLowerCase());
        setAmount(new BN(amount));
      }
    })();
  }, [abi, accounts, deployedNetwork, isLoading, isWeb3, web3]);

  const handleDonate = async () => {
    await instance?.methods
      .mintLbc("1000000000000000000")
      .send({ from: accounts[0] });

    const balance = await instance?.methods
      .balanceOf(accounts[0])
      .call({ from: accounts[0] });

    setAmount(new BN(balance));
  };

  const handleStart = async () => {
    if (localStorage.getItem("gameStatus") === "true") {
      setGameStatus(true);

      return;
    }

    if (!betValue) {
      alert("O valor da aposta precisa ter apenas números.");

      return;
    }

    if (betValue.cmp(amount) > 0) {
      alert("Você não tem LBC suficiente");

      return;
    }

    await instance?.methods
      .approve(betValue.mul(new BN("1000000000000000000")))
      .send({ from: accounts[0] });

    await instance?.methods
      .startGame(betValue.mul(new BN("1000000000000000000")))
      .send({ from: accounts[0] });

    setGameStatus(true);
    localStorage.setItem("gameStatus", "true");
  };


  return (
    <Container>
      {isLoading ? (
        <div>Loading Web3, accounts, and contract...</div>
      ) : isWeb3 ? (
        gameStatus ? (
          <Game instance={instance} accounts={accounts} />
        ) : (
          <OptionsContainer>
            <h1>Luby Game</h1>
            <Options>
              <p>Clique em "start" para poder começar as apostas.</p>
              <ButtonContainer>
                <StyledTextField
                  id="filled-basic"
                  label="valor para aposta"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setBetValue(new BN(e.target.value))}
                  helperText="não considere as 18 casas decimais"
                />
                <Button onClick={handleStart}>start</Button>
                <Button onClick={handleDonate}>donate</Button>
              </ButtonContainer>
            </Options>
            <Amount>
              <p>Banco</p>
              <strong>
                {amount.div(new BN("1000000000000000000")).toString()} LBC
              </strong>
            </Amount>
            {isOwner && (
              <WithDraw instance={instance} accounts={accounts} contractAddress={deployedNetwork.address} />
            )}
          </OptionsContainer>
        )
      ) : (
        <div>
          <p>none web3</p>
        </div>
      )}
    </Container>
  );
};

export default Menu;
