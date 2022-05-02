import { FormControlLabel, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import { useState, useEffect } from "react";
import { ButtonContainer, Button } from "../../shared/Button";
import { OptionsContainer, Options } from "../menu/styles";
import questions from "../../shared/questions.json";
import { Amount } from "../../shared/Amount";
import { Contract } from "web3-eth-contract";

interface IProps {
  instance?: Contract;
  accounts: string[];
}

const Game = (props: IProps) => {
  const [choice, setChoice] = useState<number | null>(null);
  const [amount, setAmount] = useState("0");
  const [question, setQuestion] = useState<typeof questions[0]>(
    questions[Math.floor(Math.random() * questions.length)]
  );

  const { instance, accounts } = props;

  useEffect(() => {
    if (instance) {
      instance.methods
        .getBalanceIndividual()
        .call({ from: accounts[0] })
        .then((response: string) => {
          setAmount(response);
        });
    }
  }, [accounts, instance]);

  const handleBet = async () => {
    if (choice === question.correctAnswer) {
      await instance?.methods
        .correctAnswer("1000000000000000000")
        .send({ from: accounts[0] });
    } else {
      await instance?.methods
        .incorrectAnswer("1000000000000000000")
        .send({ from: accounts[0] });
    }

    const balance = await instance?.methods
      .getBalanceIndividual()
      .call({ from: accounts[0] });

    const random = Math.floor(Math.random() * questions.length);

    setQuestion(questions[random]);
    setAmount(balance);
    setChoice(null);
  };

  const returnToMenu = () => {
    window.location.reload();

    localStorage.setItem("gameStatus", "false");
  };

  const claimReward = async () => {
    await instance?.methods.approve(amount).send({ from: accounts[0] });

    await instance?.methods.claimBalance(amount).send({ from: accounts[0] });

    localStorage.setItem("gameStatus", "false");

    window.location.reload();
  };

  return (
    <OptionsContainer>
      <Options>
        <h2>{question.question}</h2>
        <RadioGroup
          onChange={(e) => setChoice(Number(e.target.value))}
          value={choice}
        >
          {question.answers.map((answer, index) => (
            <FormControlLabel
              key={`answer${index}`}
              control={<Radio />}
              label={answer}
              value={index}
            />
          ))}
        </RadioGroup>
        <ButtonContainer>
          <Button onClick={handleBet}>apostar</Button>
          <Button onClick={claimReward}>resgatar recompensa</Button>
          <Button onClick={returnToMenu}>voltar</Button>
        </ButtonContainer>
      </Options>
      <Amount>
        <p>Em jogo</p>
        <strong>
          {amount} LBC
        </strong>
      </Amount>
    </OptionsContainer>
  );
};

export default Game;
