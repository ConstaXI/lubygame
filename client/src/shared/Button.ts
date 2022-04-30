import styled from "styled-components"
import PropTypes from "prop-types"

export const Button = styled.button`
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    font-size: 1.2rem;
    width: 100%;
    padding: 8px 16px;
    color: #eeeeee;
    background-color: #3f51b5;
    border: 1px solid;
    border-color: #3f51b5;
    border-radius: 4px;
    
    &:hover:not(:disabled),
    &:active:not(:disabled),
    &:focus {
       outline: 0;
       color: #eeeeee;
       border-color: #5c6bc0;
       background-color: #5c6bc0;
       cursor: pointer;
    }
`

export const ButtonContainer = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 48px;
    background: none;
    border: 0;

    Button {
        margin: 0.6rem;
    }
`

Button.propTypes = {
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired
}