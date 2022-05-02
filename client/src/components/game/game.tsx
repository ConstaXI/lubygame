import { FormControlLabel, RadioGroup } from "@mui/material"
import Radio from "@mui/material/Radio"
import { useState, useEffect } from 'react';
import { ButtonContainer, Button } from '../../shared/Button';
import { OptionsContainer, Options } from '../menu/styles';
import { Contract } from 'web3-eth-contract';
import questions from "../../shared/questions.json"
import { Amount } from '../../shared/Amount';
import BN from "bn.js";

interface IProps {
    instance: Contract
    accounts: string[]
}

const Game = (props: IProps) => {
    const [choice, setChoice] = useState<number | null>(null)
    const [amount, setAmount] = useState("0")
    const [question, setQuestion] = useState<typeof questions[0]>(questions[Math.floor(Math.random() * questions.length)])

    const { instance, accounts } = props

    useEffect(() => {
        instance.methods.getBalanceIndividual().call({ from: accounts[0] }).then((balance: string) => {
            setAmount(balance)
        })
    }, [accounts, instance.methods, amount])

    const handleBet = async () => {
        if (choice === question.correctAnswer) {
            await instance.methods.correctAnswer("1000000000000000000").send({ from: accounts[0] })
        } else {
            await instance.methods.incorrectAnswer("1000000000000000000").send({ from: accounts[0] })
        }
    
        const balance = await instance.methods.getBalanceIndividual().call({ from: accounts[0] })

        const random = Math.floor(Math.random() * questions.length)

        setQuestion(questions[random])

        setAmount(balance)
        setChoice(null)
    }

    const claimReward = async () => {
        await instance.methods.claimBalance(amount).send({ from: accounts[0] })
    }

    return (
        <OptionsContainer>
            <Options>
                <h2>{question.question}</h2>
                <RadioGroup onChange={(e) => setChoice(Number(e.target.value))} value={choice}>
                    {question.answers.map((answer, index) => (
                        <FormControlLabel control={<Radio />} label={answer} value={index} />
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
                {new BN(amount).div(new BN("1000000000000000000")).toString()}{" "}
                LBC
              </strong>
            </Amount>
        </OptionsContainer>
    )
}

export default Game