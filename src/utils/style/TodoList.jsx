import styled from 'styled-components';
import { flex } from './mixins';
import colors from './colors';

export const TodoForm = styled.div`
    padding: 3em;
    background-color: ${colors.third};
    max-width:400px;
    margin: 0 auto;
    border-radius: 7px;
    box-shadow: 2px 2px 3px 1px ${colors.third};
    ${flex({direction:"column"})};
    gap:1em;
    svg{
        width:16px;
        height:19px;
        cursor: pointer;
    }
    svg[data-icon="trash"]{
        color: ${colors.error};
    }
    svg[data-icon="check"]{
        color: green;
    }
`;

export const TodoContainer = styled.form`
    width:100%;
    ${flex({just: "space-between"})};
    gap:.2em;
    padding: .2em;
    border-radius: 7px;
    border:  ${({isDone}) => (isDone ? 'solid 2px green' : 'solid 2px transparent')};
    border-top: none;
    div{
        ${flex({})};
        gap:.3em;
    }
    p{
        text-decoration-line: ${({isDone}) => (isDone ? 'line-through' : 'none')};
        width: 100%;
        text-align:start;
    }
`;

export const TodoInput = styled.input`
    padding: .5em 1em;
    border: none;
    outline:none;
    width: 100%;
    border-radius: 7px;
    // box-shadow: 2px 2px 3px 1px ${colors.fourth};
`;