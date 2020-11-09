import Styled from 'styled-components';
import MyButton from '../../components/MyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core';

export const Wrapper = Styled.div`
    .MuiFormControl-root {
        width: 100%;
    }
    .MuiFormControl-root {
        display: block;
        margin-bottom: 25px;
    }
    .MuiFormLabel-root {
        transform: none;
    }
    .MuiInput-root::before {
        display: none;
    }
    .MuiInput-root::after {
        display: none;
    }
    .MuiInputBase-root {
        width: 100%;
    }
    input {
        border: 2px solid #1e3c72;
        border-radius: 5px;
        padding: 10px 20px;
    }
    label {
        top: -5px;
        font-family: 'calibri', sans-serif;
        color: #1e3c72;
    }
    .ck-editor {
        margin-top: 7px !important;
    }
    .MuiSelect-root {
        margin-top: 7px;
        margin-bottom: 15px;
        padding: 10px 20px;
        font-family: 'calibri', sans-serif;
        background: #eee;
    }
    .MuiIconButton-root {
        background: #1e3c72;
        border-radius: 5px;
    }
    .MuiIconButton-label {
        svg {
            margin: 0px;
            color: #fff;
        }
    }
    .rug-handle-button {
        background: #1e3c72 !important;
        font-family: 'calibri', sans-serif;
    }
    .rug-handle-button:hover {
        background: #1e3c72 !important;
        font-family: 'calibri', sans-serif;
    }
    label {
        font-weight: 600;
    }
`

export const Title = Styled.div`
    font-size: 30px;
    color: #1e3c72;
    font-weight: 600;

`

export const PT = Styled.div`
    overflow: auto;
    label {
        font-weight: 400;
        font-size: 14px;
    }
    .MuiFormControl-root {
        margin-bottom: 0px;
    }
    button {
        padding: 5px 10px;
        font-size: 14px;
    }
    input {
        padding: 5px 10px;
    }
`

export const FloatLeft = Styled.div`
    float: left;
    width: 50%;
`

export const FlexBox = Styled.div`
    display: flex;
`

export const Left = Styled.div`
    flex: 2;
`

export const Right = Styled.div`
    flex: 3;
`

export const ImageBox = Styled.div`
    width: 60px;
    height: 60px;
    background: ${props => 'url(' + props.src + ')'};
    background-position: center center;
    background-size: cover;
`

export const HiddenInput = Styled.input`
  display: none;
`

export const BtnIcon = Styled(FontAwesomeIcon)``

export const IconButtonWrap = Styled(IconButton)`
  background: #1e3c72 !important;
  color: #fff !important;
`