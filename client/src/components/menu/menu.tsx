import { useState, useEffect } from 'react';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils'
import json from '../../contracts/LubyGame.json';
import useWeb3 from '../../hooks/web3';
import { Button } from '../../shared/Button';
import Game from '../game/game';
import { Container, Options } from './styles';

const Menu = () => {
    const { isLoading, isWeb3, web3, accounts } = useWeb3();
    const [instance, setInstance] = useState<Contract>();
    const [game, setGame] = useState(false)

    const abi = json.abi;

    useEffect(() => {
        if (web3 !== null) {
            const deployedNetwork = json.networks["5777"];
            const instance = new web3.eth.Contract(
                abi as AbiItem[],
                deployedNetwork && deployedNetwork.address
            );
            setInstance(instance);
        }
    }, [abi, accounts, isLoading, isWeb3, web3]);

    const handleDonate = async () => {
        await instance?.methods.mintLbc("1000000000000000000").send({ from: accounts[0] })
    }

    return (
        <Container>
            {isLoading ? <div>Loading Web3, accounts, and contract...</div>
                : isWeb3 ? (game ?
                    <Options>
                        <Game />
                        <Button onClick={() => setGame(false)}>voltar</Button>
                    </Options>
                    :
                    <Options>
                        <h1>Luby Game</h1>
                        <Button onClick={() => setGame(true)}>start</Button>
                        <Button onClick={handleDonate}>donate</Button>
                    </Options>)
                    : <div>
                        <p>none web3</p>
                    </div>
            }
        </Container>
    )
}

export default Menu