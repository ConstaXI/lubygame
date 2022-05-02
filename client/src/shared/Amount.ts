import styled from "styled-components";

export const Amount = styled.strong`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #424242;
    border-radius: 4px;
    margin: 16px 0;
    height: 10rem;
    width: 100%;
    
    text-align: center;

    strong {
        font-size: 4rem;
        width: 100%;
    }

    p {
        width: 100%;
        color: #9e9e9e;
        font-weight: 400;
        font-size: 0.8rem;
    }
`