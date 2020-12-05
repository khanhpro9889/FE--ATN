import Styled from 'styled-components';
import {
    TextareaAutosize,
    IconButton
} from '@material-ui/core'
import MyButton from '../MyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Form = Styled.form`
    margin-bottom: 15px;
    padding-left: 25px;
    margin-top: -10px;
    ${({ isEdit }) => isEdit && `
        padding-left: 0px;
    `}
`

export const Textarea = Styled(TextareaAutosize)`
    width: 100%;
    resize: none;
    margin-top: 10px;
    border: 2px solid #1e3c72;
    border-radius: 5px;
    padding: 10px 10px;
    font-family: 'calibri', sans-serif;
    margin-bottom: 7px;
`

export const WrapperButton = Styled.div`
    text-align: right;
    .MuiButton-root {
        margin-left: 10px;
    }
    .Mui-disabled { 
        background: #979797 !important;
    }
    button:nth-child(2) {
        background: #1e3c72 !important;
        color: #fff !important;
        border: 1px solid #1e3c72 !important;
    }
    button:nth-child(1) {
        background: #fff !important;
        color: #1e3c72 !important;
        border: 1px solid #1e3c72 !important;
    }
`

export const Button = Styled(MyButton)`
    svg {
        font-size: 18px;
    }
`

export const BtnIcon = Styled(FontAwesomeIcon)`
    color: #1e3c72;
    font-size: 14px;
`

export const IconButtonWrap = Styled(IconButton)`

`

export const OptionChoice = Styled.div`
    display: inline-block;
    position: relative;
    background: #fff;
`

export const Menu = Styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 5px silver;
    position: absolute;
    bottom: -60px;
    right: 10px;
    padding: 5px;
    z-index: 3;
    background: #fff;
`

export const MenuItem = Styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
    padding-right: 5px;
    background: none;
    display: inline-block;
    cursor: pointer;
    font-size: 12px;
    svg {
        color: #1e3c72;
        font-size: 16px;
        margin-right: 0px;
    }
`

export const Icon = Styled(FontAwesomeIcon)`
    color: #1e3c72;
    cursor: pointer;
    font-size: 30px;
`
