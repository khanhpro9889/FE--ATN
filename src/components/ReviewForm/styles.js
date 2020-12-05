import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    TextareaAutosize,
} from '@material-ui/core'
import MyButton from '../MyButton';

export const Form = Styled.form`
    margin-bottom: 15px;
    .Mui-disabled {
        background: #979797 !important;
    }
`

export const Icon = Styled(FontAwesomeIcon)`
    color: #1e3c72;
    cursor: pointer;
    font-size: 30px;
`

export const StarsBox = Styled.div`

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

export const Title = Styled.h4`
    margin-bottom: 5px;
`

export const Button = Styled(MyButton)`
    svg {
        font-size: 18px;
    }
`

export const ButtonWrapper = Styled.div`
    button {
        margin-right: 10px;
    }
    button:nth-child(1) {
        background: #1e3c72;
        color: #fff;
        border: 1px solid #1e3c72;
    }
    button:nth-child(2) {
        background: #fff;
        color: #1e3c72;
        border: 1px solid #1e3c72;
    }
`