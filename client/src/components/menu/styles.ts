import styled from "styled-components"
import { TextField } from '@mui/material';

export const Container = styled.div`
    height: 100%;
    width: 460px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const Options = styled.div`
    h1, h2, h3, h4, h5, h6 {
        font-size: 1.6rem;
        color: #eeeeee;
    }

    p {
        width: 100%;
        color: #9e9e9e;
        font-weight: 400;
        font-size: 0.8rem;
    }

    text-align: center;
    padding: 1rem 3rem 4rem 3rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #424242;
`

export const OptionsContainer = styled.div`
    h1 {
        width: 100%;
        font-size: 3.6rem;
        text-align: center;
    }

    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const StyledTextField = styled(TextField)`
    fieldset {
        border: 1px solid #eeeeee;
    }

    input {
        color: #eeeeee;
    }

    label {
        color: #eeeeee;
    }
`
