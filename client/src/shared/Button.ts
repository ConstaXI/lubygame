import styled from "styled-components"
import PropTypes from "prop-types"

export const Button = styled.button`
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    padding: 8px 16px;
    color: white;
    background-color: rebeccapurple;
    border: 1px solid;
    border-color: rebeccapurple;
    border-radius: 20px;
    
    &:hover:not(:disabled),
    &:active:not(:disabled),
    &:focus {
       outline: 0;
       color: white;
       border-color: salmon;
       background-color: salmon;
       cursor: pointer;
    }
`

Button.propTypes = {
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired
}