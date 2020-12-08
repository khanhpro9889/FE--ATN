import Styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = Styled.div`
    display: flex;
    min-height: calc(100vh - 80px);
    @media only screen and (max-width: 768px) {
        display: block;
    }
`

export const Icon = Styled(FontAwesomeIcon)`
  font-size: 18px;
  color: #1e3c72;
`

export const IconBtn = Styled(IconButton)`

`

export const ErrorText = Styled.div`
    color: #f44336;
    font-size: 0.75rem;
    text-align: right;
`

export const Left = Styled.div`
    flex: 1.5;
    margin-right: 10px;
    height: calc(100vh - 80px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #1e3c7282 #eee;
    @media only screen and (max-width: 768px) {
        flex: unset;
        width 100%;
        margin-right: 0px;
        height: min-content;
    }
    .MuiSelect-root {
        margin-top: 7px;
        margin-bottom: 15px;
        padding: 10px 20px;
        font-family: 'calibri', sans-serif;
        background: #eee;
    }
    .MuiFormControl-root {
        width: 100%;
    }
    .MuiFormControl-root {
        display: block;
        margin: 0px;
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
    h3 {
        margin-top: 30px;
        margin-bottom: 30px;
    }
    input {
        border: 2px solid #1e3c72;
        border-radius: 18px;
        padding: 8px 5px;
        font-size: 16px;
        margin-top: 7px;
        padding-right: 37px;
    }
`

export const ButtonSearch = Styled(IconButton)`
    background: #1e3c72 !important;
    position: absolute !important;
    top: 11px;
    right: 6px;
    padding: 7px !important;
`

export const BtnIcon = Styled(FontAwesomeIcon)`
    color: #fff;
    font-size: 16px;
`


export const Right = Styled.div`
    flex: 1;
    margin-left: 10px;
    height: 100vh;
    @media only screen and (max-width: 768px) {
        margin-left: 0px;
        flex: unset;
        width 100%;
        margin-right: 0px;
    }
    @media only screen and (max-width: 480px) {
        margin-left: 0px;
        flex: unset;
        width 100%;
        margin-right: 0px;
        height: 200px;
    }
    .leaflet-container {
        width: 100%;
        height: 100%;
        position: sticky !important;
        top: 0px;
    }
`

export const LoadingDiv = Styled.div`
    //height: calc(100vh - 80px);
    >div {
        display: flex;
        justify-content: center;
        margin-top: 200px;
    }
`

export const FlexBox = Styled.form`
    display: flex;
    margin-top: 20px;
    @media only screen and (max-width: 480px) {
        margin-left: 0px;
        width 100%;
        margin-right: 0px;
        display: block;
    }
`

export const FlexBox1 = Styled.form`
    display: flex;
    margin-top: 20px;
`

export const LeftLeft = Styled.div`
    flex: 1;
    margin-right: 5px;
    @media only screen and (max-width: 480px) {
        margin-left: 0px;
        width 100%;
        margin-right: 0px;
        display: block;
    }
`

export const LeftCenter = Styled.div`
    flex: 1;
    margin-right: 5px;
    margin-left: 5px;
    @media only screen and (max-width: 480px) {
        margin-left: 0px;
        width 100%;
        margin-right: 0px;
        display: block;
    }
`

export const LeftRight = Styled.div`
    flex: 2;
    margin-left: 5px;
    position: relative;
    @media only screen and (max-width: 768px) {
        margin-left: 0px;
        width 100%;
        margin-right: 0px;
        display: block;
    }
`

export const LoadingDiv1 = Styled.div`
    //height: calc(100vh - 80px);
    >div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 200px;
        margin-bottom: 200px;
    }
    @media only screen and (max-width: 480px) {
        >div {
            margin-top: 70px;
            margin-bottom: 70px; 
        }
    }
`

export const LeftGym = Styled.div`
    width: calc(100% - 40px);
    @media only screen and (max-width: 480px) {
        margin-left: 0px;
        margin-right: 0px;
        display: block;
    }
`

export const RightGym = Styled.div`
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 480px) {
        margin-left: 0px;
        margin-right: 0px;
    }
`
