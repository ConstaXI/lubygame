import { useState, useEffect } from 'react';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils'
import json from '../../contracts/LubyGame.json';
import useWeb3 from '../../hooks/web3';
import { Amount } from '../../shared/Amount';
import { Button, ButtonContainer } from '../../shared/Button';
import Game from '../game/game';
import { Container, Options, OptionsContainer } from './styles';

const Menu = () => {
    const { isLoading, isWeb3, web3, accounts } = useWeb3();
    const [instance, setInstance] = useState<Contract>();
    const [game, setGame] = useState(false)
    const [amount, setAmount] = useState("0")

    const abi = json.abi;

    useEffect(() => {
        if (web3 !== null) {
            const deployedNetwork = json.networks["5777"];
            const we3Instance = new web3.eth.Contract(
                abi as AbiItem[],
                deployedNetwork && deployedNetwork.address
            );
            setInstance(we3Instance);
            
            we3Instance.methods.balanceOf(accounts[0]).call({ from: accounts[0] }).then((response: string) => {
                setAmount(response)
            })
        }
    }, [abi, accounts, isLoading, isWeb3, web3, amount]);

    const handleDonate = async () => {
        await instance?.methods.mintLbc("1000000000000000000").send({ from: accounts[0] })

        instance?.methods.balanceOf(accounts[0]).call({ from: accounts[0] }).then((response: string) => {
            setAmount(response)
        })
    }

    const handleStart = async () => {
        setGame(true)

        await instance?.methods.startGame("1000000000000000000").send({ from: accounts[0] })
    }

    return (
        <Container>
            {isLoading ? <div>Loading Web3, accounts, and contract...</div>
                : isWeb3 ? (game ?
                    <Game instance={instance as Contract} accounts={accounts} />
                    :
                    <OptionsContainer>
                        <h1>Luby Game</h1>
                        <Options>
                            <p>Bem vindo ao Luby Game. Assim que você clicar em "start" poderá começar as apostas</p>
                            <ButtonContainer>
                                <Button onClick={handleStart}>start</Button>
                                <Button onClick={handleDonate}>donate</Button>
                            </ButtonContainer>
                        </Options>
                        <Amount>
                            {amount}
                        </Amount>
                    </OptionsContainer>
                    )
                    : <div>
                        <p>none web3</p>
                    </div>
            }
        </Container>
    )
}

export default Menu