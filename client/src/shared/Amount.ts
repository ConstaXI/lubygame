import styled from "styled-components";

export const Amount = styled.strong`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #424242;
    border-radius: 4px;
    margin-top: 16px;
    padding: 24px 48px;
    
    text-align: center;

    strong {
        font-size: 2.4rem;
        width: 100%;
    }

    p {
        width: 100%;
        color: #9e9e9e;
        font-weight: 400;
        font-size: 0.8rem;
    }
`