import styled,{createGlobalStyle} from 'styled-components';
import {flex} from './mixins';
import colors from './colors';

export const StyledGlobalStyle = createGlobalStyle`
    * {
        list-style-type: none;
        padding: 0;
        margin:0;
        text-decoration: none;
        box-sizing: border-box;
    }
    body {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
        font-size: 16px;
        text-align:center;
    }
    #root{
        min-height: 100vh;
        ${flex({ just : 'space-between', align : 'space-between', direction : 'column'})}
    }
    section{
        ${flex({})};
    }
`;

export const Button = styled.button`
    padding: .8em 1em;
    border-radius: 7px;
    border: 1px solid white;
    background-color: ${colors.fourth};
    cursor: pointer;
    transition: ease-in-out .3s all;
    &:hover{
        background-color: ${colors.third};
        border:1px solid white;
        // color: white;
    }
`;