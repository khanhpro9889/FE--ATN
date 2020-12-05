import Styled from 'styled-components';
import MyButton from '../../components/MyButton';
import {
    TextareaAutosize,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@material-ui/core'

export const Form = Styled.form`
    min-height: calc(100vh - 141px);
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
        font-size: 22px;
        margin-top: 10px;
    }
    label {
        top: -5px;
        font-family: 'calibri', sans-serif;
        color: #1e3c72;
        font-size: 22px;
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
    .MuiTypography-root {
        font-family: 'calibri' , sans-serif;
    }
    label {
        font-weight: 600;
    }
`


export const WrapperLoading = Styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Textarea = Styled(TextareaAutosize)`
  width: 100%;
  resize: none;
  border: 2px solid #1e3c72;
    border-radius: 5px;
    padding: 10px 20px;
    font-family: 'calibri', sans-serif;
`

export const FlexBox = Styled.div`
    display: flex;
`

export const Left = Styled.div`
    flex: 2;
    padding-right: 150px;
`

export const Right = Styled.div`
    flex: 1;
    img {
        width: 100%;
        height: 400px;
        object-fit: cover;
    }
`

export const ButtonPlace = Styled.div`
    text-align: right;
    margin-top: 20px;
    button {
        margin-left: 10px;
    }
    button:nth-child(3) {
        background: #1e3c72 !important;
        color: #fff !important;
        border: 1px solid #1e3c72 !important;
    }
    button:nth-child(1) {
        background: #fff !important;
        color: #1e3c72 !important;
        border: 1px solid #1e3c72 !important;
    }
    button:nth-child(2) {
        background: #fff !important;
        color: #1e3c72 !important;
        border: 1px solid #1e3c72 !important;
    }
`

export const Button = Styled(MyButton)``

export const Content = Styled.div`
    overflow-x: auto !important;
    white-space: nowrap !important;
    scrollbar-width: thin;
    scrollbar-color: #1e3c7282 #eee;
`

export const Element = Styled.div`
   width: 400px;
   display: inline-block;
   margin-right: 20px;
   white-space: normal;
`

export const ServiceItem = Styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 20px;
    margin-left: 5px;
    border-radius: 5px;
    padding: 25px;
    box-shadow: 0px 0px 5px silver;
    text-align: justify;
    position: relative;
    .MuiButtonBase-root {
        position: absolute;
        top: 25px;
        right: 25px;
    }
`

export const Title = Styled.h1`
    text-align: center;
`

export const Description = Styled.div`
    font-size: 18px;
`

export const BtnIcon = Styled(FontAwesomeIcon)`
    font-size: 12px;
`

export const IconButtonWrap = Styled(IconButton)`
  background: #1e3c72 !important;
  color: #fff !important;
`

export const ErrorText = Styled.div`
    color: #f44336;
    font-size: 0.75rem;
`

export const WrapperTable = Styled.div`
    margin: 20px 0px;
    display: flex;
    justify-content: center;
    .MuiButtonBase-root {
        margin-left: 10px;
    }
    .MuiTableContainer-root {
        max-width: 600px;
        box-shadow: 0px 0px 5px silver;
    }
`