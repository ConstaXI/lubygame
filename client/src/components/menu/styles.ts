import styled from "styled-components"
import PropTypes from "prop-types"

export const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const Options = styled.div`
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

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