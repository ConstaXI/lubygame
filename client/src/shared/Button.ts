import styled from "styled-components"
import PropTypes from "prop-types"

export const Button = styled.button`
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    font-size: 1.4rem;
    width: 100%;
    height: 56px;
    margin: 8px 0;
    padding: 8px 16px;
    color: #eeeeee;
    border: 1px solid;
    background-color: #1976d2;
    border-color: #1976d2;
    border-radius: 4px;
    
    &:hover:not(:disabled),
    &:active:not(:disabled),
    &:focus {
       outline: 0;
       color: #eeeeee;
       border-color: #2196f3;
       background-color: #2196f3;
       cursor: pointer;
    }
`

export const ButtonContainer = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;

    background: none;
    border: 0;
`

Button.propTypes = {
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired
}