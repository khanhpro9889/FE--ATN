import Styled from 'styled-components';
import MyButton from '../MyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, TextareaAutosize } from '@material-ui/core'

export const Wrapper = Styled.div`
    form {
        .MuiSelect-selectMenu {
            font-family: 'calibri', sans-serif;
        }
        .MuiInput-underline::before {
            display: none;       
        }
        .MuiSelect-root {
            margin-top: 7px;
            margin-bottom: 7px;
            border: 2px solid #aaa;
            border-radius: 5px;
            padding: 10px;
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
            border: 2px solid #aaaaaa;
            border-radius: 5px;
            padding: 10px 10px;
        }
        input:focus {
            border: 2px solid #1e3c72;
        }
        label {
           top: -5px;
           font-family: 'calibri', sans-serif;
           color: #1e3c72;
        }
        span {
            font-family: 'calibri', sans-serif;
        }
    }
`

export const ButtonEdit = Styled(MyButton)`
    margin: 5px !important;
`

export const Textarea = Styled(TextareaAutosize)`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 10px;
  border: 2px solid #aaaaaa !important;
  border-radius: 5px;
  width: 100%;
  resize: none;
  border: none;
  font-family: 'calibri', sans-serif;
  &:focus {
    border: 2px solid #1e3c72 !important;
  }
`

export const ImgBox = Styled.div`
    text-align: center;
    margin-bottom: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    label {
        position: absolute;
        top: 92px;
        right: 110px;
    }
`

export const ImgProfile = Styled.img`
    border-radius: 50%;
    height: 150px;
    width: 150px;
    object-fit: cover;
`

export const ButtonPlace = Styled.div`
    text-align: center;
`

export const HiddenInput = Styled.input`
  display: none;
`

export const BtnIcon = Styled(FontAwesomeIcon)``

export const IconButtonWrap = Styled(IconButton)`
  background: #1e3c72 !important;
  color: #fff !important;
`