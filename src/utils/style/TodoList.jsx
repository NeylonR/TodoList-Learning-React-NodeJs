import styled, { keyframes } from 'styled-components';
import { flex } from './mixins';
import colors from './colors';

const validBorder = keyframes`{
    0% {
        width: 0;
        height: 0;
        opacity:0;
    }
    50% {
        width: 50%;
        height:0%;
    }
    100% {
        width: 50%;
        height: 100%;
    }
}`;
const validBorderTop = keyframes`{
    0% {
        width: 0px;
    }
    50% {
        width: 0px;
    }
    100% {
        width: 50%
    }
}`;
const validArticle = keyframes`{
    0% {
        transform: translate(0,0);
    }
    50%{
        transform: translate(0,0);
    }
    70%{
        transform: translateY(-7px);
    }
    80%{
        transform: translateY(0px);
    }
    90%{
        transform: translateY(-7px);
    }
    100%{
        transform: translate(0,0);
    }
    
}`;

export const TopArticle = styled.span`
    position: absolute;
    top:0;
    width:100%;
    height:10px;
    &:before, &:after{
        position: absolute;
        top:0px;
        content: '';
        height: 100%;
        width: 0;
        display: block;
        opacity: 0;
        border-top: solid 3px green;
        border-left: solid 0 transparent;
        border-right: solid 0 transparent;
        z-index:1;
    }
    &:before {
        border-top-right-radius:7px;
        right: 0%;
    }
    &:after {
        border-top-left-radius:7px;
        left: 0%;
    }
`;

export const TodoListArticle = styled.article`
    position: relative;
    margin-bottom: 1em;
    padding: 2em 1em;
    background-color: ${colors.third};
    width:400px;
    // margin: 0 auto 1em;
    border-radius: 7px;
    box-shadow: 2px 2px 3px 1px ${colors.third};
    ${flex({direction:"column"})};
    gap:.3em;
    word-break:break-word;
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
    .listTitle{
        padding: 1.25em 0;
    }
    .deleteList{
        position: absolute;
        top: 1em;
        right: 1em;
    }
    &.validating:before, &.validating:after{
        z-index:3;
        opacity: 1;
        position: absolute;
        bottom:-3px;
        content: '';
        height: 0;
        width: 0;
        border-bottom: solid 3px green;
        border-radius:7px;
    }
    &.validating:before, &.validating:after {
        animation: ${validBorder} forwards 1s;
        animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);
        border-bottom: solid 3px green;
    }
    &.validating:before{
        left:50%;
        border-right: solid 3px green;
        border-bottom-left-radius:7px;
    }
    &.validating:after{
        right:50%;
        border-left: solid 3px green;
        border-bottom-right-radius:7px;
    }
    &.validating ${TopArticle}:before, &.validating ${TopArticle}:after {
        opacity: 1;
        animation: ${validBorderTop} ease-in-out forwards 2s;
    }
    &.validating {
        animation: ${validArticle} ease-in-out forwards 2s;
    }
`;

export const TodoForm = styled.form`
    transition: all .3s ease-in-out;
    position: relative;
    width:100%;
    ${flex({just: "space-between"})};
    gap:.5em;
    border-radius: 7px;
    // border:  ${({isDone}) => (isDone ? 'solid 2px green' : 'solid 2px transparent')};
    padding: 1.25em 1em;
    ${({modify}) => (modify && `box-shadow: inset 0px 0px 3px 3px ${colors.fourth};`)}
    div{
        ${flex({})};
        gap:.3em;
    }
    p{
        text-decoration-line: ${({isDone}) => (isDone ? 'line-through' : 'none')};
        ${({isDone}) => (isDone && 'color: green;')};
        width: 100%;
        text-align:start;
        transition: all .3s ease-in-out;
    }
    &:not(:last-of-type):after{
        content: '';
        position: absolute;
        bottom: -.15em;
        left: 50%;
        transform: translate(-50%, 50%);
        width: 85%;
        height: 2px;
        background-color: black;
    }
    &.listTitle{
        padding: 1.25em 1em;
    }
    &.listTitle:after{
        display: none;
    }
`;

export const TodoDiv = styled.div`
    width:100%;
    ${flex({align:"flex-start", direction:"row"})}
    flex-wrap:wrap;
    gap: 2em;
    padding: .5em;
    border-radius: 7px;
    border:  ${({isDone}) => (isDone ? 'solid 2px green' : 'solid 2px transparent')};
    border-top: none;
    div{
        ${flex({})};
        gap:.4em;
    }
`;

export const TodoInput = styled.input`
    // padding: .3em 1em;
    border: none;
    outline:none;
    width: 100%;
    border-radius: 0px;
    // box-shadow: 2px 2px 3px 1px ${colors.fourth};
    background-color: transparent;
    &.inputTitle{
        font-size: 24px;
        font-weight: 600;
        text-align:center;
    }
`;

export const SaveButton = styled.button`
    position: absolute;
    z-index:6;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 60px;
    height: 60px;
    // padding: 1.5em 1em;
    border-radius: 100%;
    border: 1px solid white;
    background-color: ${colors.fourth};
    cursor: pointer;
    transition: ease-in-out .3s all;
    &:hover:not(:disabled){
        background-color: ${colors.third};
        border:1px solid white;
        // color: white;
    }
`;