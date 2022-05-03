import { FormControlLabel, RadioGroup } from "@mui/material";
import Radio from "@mui/material/Radio";
import { useState, useEffect } from "react";
import { ButtonContainer, Button } from "../../shared/Button";
import { OptionsContainer, Options } from "../menu/styles";
import questions from "../../shared/questions.json";
import { Amount } from "../../shared/Amount";
import { Contract } from "web3-eth-contract";
import BN from "bn.js";

interface IProps {
  instance?: Contract;
  accounts: string[];
}

const Game = (props: IProps) => {
  const [choice, setChoice] = useState<number | null>(null);
  const [amount, setAmount] = useState(new BN("0"));
  const [question, setQuestion] = useState<typeof questions[0]>(
    questions[Math.floor(Math.random() * questions.length)]
  );
  const [bonus, setBonus] = useState(
    new BN(localStorage.getItem("bonus") || "0")
  );

  const loss = new BN("2000000000000000000");

  const { instance, accounts } = props;

  useEffect(() => {
    if (instance) {
      instance.methods
        .getBalanceIndividual()
        .call({ from: accounts[0] })
        .then((response: string) => {
          setAmount(new BN(response));
        });
    }
  }, [accounts, instance]);

  const returnToMenu = () => {
    window.location.reload();

    localStorage.setItem("gameStatus", "false");
  };

  const handleBet = async () => {
    if (choice === question.correctAnswer) {
      await instance?.methods
        .correctAnswer("1000000000000000000")
        .send({ from: accounts[0] });

      const newBonus = bonus.add(new BN("1000000000000000000"));

      localStorage.setItem("bonus", newBonus.toString());
      setBonus(newBonus);
    } else {
      if (amount.cmp(loss) < 1) {
        await instance?.methods
          .incorrectAnswer(amount)
          .send({ from: accounts[0] });

        returnToMenu();

        return;
      }

      await instance?.methods.incorrectAnswer(loss).send({ from: accounts[0] });

      localStorage.setItem("bonus", "0");
      setBonus(new BN("0"));
    }

    const balance = await instance?.methods
      .getBalanceIndividual()
      .call({ from: accounts[0] });

    const random = Math.floor(Math.random() * questions.length);

    setQuestion(questions[random]);
    setAmount(new BN(balance));
    setChoice(null);
  };

  const claimReward = async () => {
    await instance?.methods.claimBalance(bonus).send({ from: accounts[0] });

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
        </ButtonContainer>
      </Options>
      <Amount>
        <p>Em jogo</p>
        <strong>
          {amount.div(new BN("1000000000000000000")).toString()} LBC
          <br />+ {bonus.div(new BN("1000000000000000000")).toString()} LBC
          bonus
        </strong>
      </Amount>
    </OptionsContainer>
  );
};

export default Game;
