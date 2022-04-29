import { FormControlLabel, RadioGroup } from "@mui/material"
import Radio from "@mui/material/Radio"

const Game = () => {
    const response = {
        question: "A participação da África na Segunda Guerra Mundial deve ser apreciada sob a ótica da escolha entre vários demônios. O seu engajamento não foi um processo de colaboração com o imperialismo, mas uma luta contra uma forma de hegemonia ainda mais perigosa.",
        answers: ["Comunismo / rejeição da democracia liberal.", "Capitalismo / devastação do ambiente natural.", "Fascismo / adoção do determinismo biológico.", "Colonialismo / imposição da missão civilizatória."]
    }

    return (
        <>
            <h2>{response.question}</h2>
            <RadioGroup>
                {response.answers.map((answer, index) => (
                    <FormControlLabel control={<Radio/>} label={answer} value={index} />
                ))}
            </RadioGroup>
        </>
    )
}

export default Game