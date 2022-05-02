import BN from "bn.js";
import { useState, useEffect } from "react";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import json from "../../contracts/LubyGame.json";
import useWeb3 from "../../hooks/web3";
import { Amount } from "../../shared/Amount";
import { Button, ButtonContainer } from "../../shared/Button";
import Game from "../game/game";
import {
  Container,
  Options,
  OptionsContainer,
  StyledTextField,
} from "./styles";

const Menu = () => {
  const { isLoading, isWeb3, web3, accounts } = useWeb3();
  const [instance, setInstance] = useState<Contract>();
  const [game, setGame] = useState(false);
  const [amount, setAmount] = useState(new BN(0));
  const [betValue, setBetValue] = useState("0");

  const abi = json.abi;

  useEffect(() => {
    if (web3 !== null) {
      const deployedNetwork = json.networks["5777"];
      const we3Instance = new web3.eth.Contract(
        abi as AbiItem[],
        deployedNetwork && deployedNetwork.address
      );
      setInstance(we3Instance);

      we3Instance.methods
        .balanceOf(accounts[0])
        .call({ from: accounts[0] })
        .then((response: string) => {
          setAmount(new BN(response));
        });
    }
  }, [abi, accounts, isLoading, isWeb3, web3, amount]);

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
    if (!/^[0-9]+$/.test(betValue)) {
      alert("O valor da aposta precisa ter apenas números.");

      return;
    }

    await instance?.methods.approve(betValue).send({ from: accounts[0] });

    await instance?.methods.startGame(betValue).send({ from: accounts[0] });

    setGame(true);
  };

  return (
    <Container>
      {isLoading ? (
        <div>Loading Web3, accounts, and contract...</div>
      ) : isWeb3 ? (
        game ? (
          <Game instance={instance as Contract} accounts={accounts} />
        ) : (
          <OptionsContainer>
            <h1>Luby Game</h1>
            <Options>
              <p>
                Clique em "start" para poder começar as apostas.
              </p>
              <ButtonContainer>
                <StyledTextField
                id="filled-basic"
                label="valor para aposta"
                variant="outlined"
                fullWidth
                onChange={(e) => setBetValue(e.target.value)}
                helperText="considere as 18 casas decimais"
                />
                <Button onClick={handleStart}>start</Button>
                <Button onClick={handleDonate}>donate</Button>
              </ButtonContainer>
            </Options>
            <Amount>
              <p>Banco</p>
              <strong>
                {new BN(amount).div(new BN("1000000000000000000")).toString()}{" "}
                LBC
              </strong>
            </Amount>
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
