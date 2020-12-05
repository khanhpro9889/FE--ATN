import Styled from 'styled-components';
import MyButton from '../../components/MyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@material-ui/core'

export const Form = Styled.form`
    margin-top: 15px;
    button:nth-child(1) {
        margin-top: -10px;
    }
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
    .error {
        color: #f44336;
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
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FlexBox = Styled.div`
    display: flex;
`

export const Left = Styled.div`
    flex: 2;
    padding-right: 150px;
    .MuiTypography-root {
        font-family: 'calibri' , sans-serif;
        font-size: 20px;
    }
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
    button:nth-child(2) {
        background: #1e3c72 !important;
        color: #fff !important;
        border: 1px solid #1e3c72 !important;
        margin-left: 10px;
    }
    button:nth-child(1) {
        background: #fff !important;
        color: #1e3c72 !important;
        border: 1px solid #1e3c72 !important;
    }
`

export const Button = Styled(MyButton)``

export const FormRow = Styled.div`
    display: flex;
`

export const FormColRight = Styled.div`
    flex: 1;
    margin-left: 10px;
`

export const FormColLeft = Styled.div`
    flex: 1;
    margin-right: 10px;
`

export const BtnIcon = Styled(FontAwesomeIcon)`
    font-size: 10px;
`

export const IconButtonWrap = Styled(IconButton)`
  background: #1e3c72 !important;
  color: #fff !important;
  padding: 5px !important;
`

export const Title = Styled.h3``

export const Span = Styled.a`
    margin-right: 10px;
    font-size: 20px;
`

export const ErrorText = Styled.div`
    color: #f44336;
    font-size: 0.75rem;
`
