import Styled from 'styled-components';
import MyButton from '../../components/MyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core'
import {
    TextareaAutosize,
} from '@material-ui/core'

export const FormService = Styled.form`
    .MuiFormControl-root {
        margin-bottom: -5px;
    }
    button {
        margin: 0px;
        margin-top: -25px;
    }
    label {
        font-size: 14px;
    }
    input {
        font-size: 14px;
    }
    textarea {
        font-size: 14px;
    }
`

export const Textarea = Styled(TextareaAutosize)`
  width: 100%;
  resize: none;
  border: 2px solid #1e3c72;
    border-radius: 5px;
    padding: 10px 20px;
    font-family: 'calibri', sans-serif;
`

export const FormLeft = Styled.div`
    flex: 1;
    margin-right: 5px;
`

export const FormRight = Styled.div`
    flex: 1;
    margin-left: 5px;
    margin-top: 10px;
    label {
        
    }
`

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
    .MuiTypography-root {
        font-family: 'calibri' , sans-serif;
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

export const SubmitButton = Styled(MyButton)`
    margin-top: 10px !important;
    margin-right: 10px !important;
`

export const ErrorText = Styled.div`
    color: #f44336;
    font-size: 0.75rem;
`

export const Icon = Styled(FontAwesomeIcon)`
  font-size: 20px;
  margin-left: 16px;
  margin-right: 10px;
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
    width: 48%;
    margin-top: 10px;
    margin-right: 2%;
    padding-left: 5px;
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

export const Service = Styled.div`
    overflow: auto;
    padding-bottom: 10px;
`

export const ClearFix = Styled.div`
    overflow: auto;
`

export const FloatLeftUtil = Styled.div`
    width: 25%;
    padding-right: 15px;
    float: left;
    .MuiButtonBase-root {
        background: #fff;
    }
    svg {
        color: #1e3c72 !important;
    }
`