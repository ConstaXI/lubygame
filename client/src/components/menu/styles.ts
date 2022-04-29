import styled from "styled-components"

export const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const Options = styled.div`
    h1, h2, h3, h4, h5, h6 {
        font-size: 1.6rem;
        color: #eeeeee;
    }

    padding: 3rem 2rem;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #424242;
`

export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 35vw;
`