import Styled from 'styled-components';
import Select from '@material-ui/core/Select';
import { IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Banner = Styled.div`
    background: ${props => 'url(' + props.src + ')'};
    width: 100%;
    min-height: 400px;
    background-size: cover;
    background-position: center center;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &::before {
        position: absolute;
        top: 0px;
        content: '';
        left: 0px;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.6;
    }
    @media only screen and (max-width: 480px) {
        min-height: 200px;
    }
    span{
        color: orange;
    }
    form {
        margin: 0 auto;
        display: flex;
        z-index: 5;
        position: relative;
        .MuiIconButton-label {
            @media only screen and (max-width: 480px) {
                padding: 7px !important;
            }
        }
        .MuiInputBase-root {
            background: #fff;
            padding-left: 20px;
            padding-right: 20px;
            position: relative;
            @media only screen and (max-width: 480px) {
                padding: 2px 2px;
                width: 100px;
                font-size: 12px;
            }
        }
        .MuiSelect-root {
            position:relative;
            overflow: unset !important;
        }
        .MuiSelect-root::after {
            content: '';
            position: absolute;
            height: 100%;
            width: 2px;
            background: #1e3c72;
            right: -25px;
            z-index: 5;
            top: 0px;
            @media only screen and (max-width: 480px) {
                display: none;
            }
        }
        .MuiSelect-selectMenu {
            font-family: 'calibri', sans-serif;
        }
        .MuiInput-underline::before {
            display: none;
        }
        label {
            display: flex;
            position: absolute;
            right: 0px;
            height: 100%;
            @media only screen and (max-width: 480px) {
                right: -7px;
            }
        }
        .MuiIconButton-label {
            background: #1e3c72;
            border-radius: 50%;
            padding: 12px;
        }
    }
    input {
        border: none;
        font-size: 18px;
        @media only screen and (max-width: 480px) {
            padding-left: 5px;
            padding-right: 7px;
            width: 110px;
            font-size: 12px;
        }
    }
    
`

export const Title = Styled.div`
    font-size: 34px;
    font-weight: 600;
    color: #fff;
    z-index: 3;
    position: relative;
    text-align: center;
    line-height: 1.5em;
    letter-spacing: 1.5px;
    font-family: 'calibri';
    margin-bottom: 25px;
    @media only screen and (max-width: 480px) {
        font-size: 20px;
        padding: 0 10px;
    }
`

export const BodyHome = Styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    @media only screen and (max-width: 480px) {
        display: block;
    }
`

export const Left = Styled.div`
    flex: 1;
    padding-right: 10px;
    @media only screen and (max-width: 480px) {
        width: 100%;
        flex: unset;
    }
`

export const Right = Styled.div`
    flex: 1;
    @media only screen and (max-width: 480px) {
        width: 100%;
        flex: unset;
        margin-top: 30px;
    }
`

export const SubTitle = Styled.div`
    color: #1e3c72;
    margin-bottom: 30px;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 500;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        height: 3px;
        width: 80px;
        background: #96deda;
        left: 0px;
        bottom: -7px;
        @media only screen and (max-width: 480px) {
            width: 40px;
        }
    }
    @media only screen and (max-width: 480px) {
        font-size: 16px;
    }
`

export const Input1 = Styled(Select)`
    padding: 15px 20px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    @media only screen and (max-width: 480px) {
        padding-left: 5px;
        padding-right: 7px;
        width: 110px;
        font-size: 12px;
    }
`

export const Input2 = Styled.input`
    padding: 15px 20px;
`

export const Input3 = Styled.input`
    padding: 15px 20px;
    padding-right: 60px !important;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    @media only screen and (max-width: 480px) {
        width: 150px !important;
        padding-left: 0px !important;
        padding-right: 40px !important;
    }
`

export const ButtonSearch = Styled(IconButton)`

`

export const BtnIcon = Styled(FontAwesomeIcon)`
    color: #fff;
    font-size: 18px;
    @media only screen and (max-width: 480px) {
        font-size: 12px;
    }
`

export const Category = Styled.div`
    min-height: 600px;
    display: flex;
    margin-bottom: 50px;
    @media only screen and (max-width: 480px) {
        display: none;
        min-height: unset;
    }
`

export const LeftCategory = Styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    @media only screen and (max-width: 480px) {
        width: 100%;
        height: 600px;
        margin-bottom: 10px;
        margin-right: 0px;
    }
`

export const RightCategory = Styled.div`
    flex: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 480px) {
        width: 100%;
        height: 600px;
        margin-top: 10px;
        margin-left: 0px;
    }
`

export const CategoryName = Styled.div`
    color: #fff;
    font-size: 48px;
    position: absolute;
    z-index: 10;
    bottom: 20px;
    left: 20px;
    font-weight: 300;
    letter-spacing: 1.5px;
    @media only screen and (max-width: 480px) {
        font-size: 28px;
    }
`

export const CategoryItem = Styled.div`
    background: ${props => 'url(' + props.src + ')'};
    width: 90%;
    background-size: cover;
    background-position: center center;
    border-radius: 10px;
    position: relative;
    height: 100%;
    cursor: pointer;
    margin-right: 15px;
    display: inline-block;
    &::before {
        position: absolute;
        top: 0px;
        content: '';
        left: 0px;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.4;
        border-radius: 10px;
    }
`

export const CategoryMobile = Styled.div`
    height: 200px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
`

export const FullWidth = Styled.div`
    padding: 10px;
    display: none;
    margin-bottom: 20px;
    @media only screen and (max-width: 480px) {
        display: block;
        background: #1e3c72;
    }
`

export const CategoryItemV2 = Styled.div`
    flex: 1;
    margin-bottom: 10px;
    background: ${props => 'url(' + props.src + ')'};
    width: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    transition: 0.4s;
    &::before {
        position: absolute;
        border-radius: 10px;
        top: 0px;
        content: '';
        left: 0px;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.4;
    }
    @media only screen and (max-width: 480px) {
        width: 100%;
        height: 200px;
    }
`

export const CategoryItemV3 = Styled.div`
    flex: 1;
    margin-top: 10px;
    background: ${props => 'url(' + props.src + ')'};
    width: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    transition: 0.4s;
    &::before {
        position: absolute;
        border-radius: 10px;
        top: 0px;
        content: '';
        left: 0px;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.4;
    }
    @media only screen and (max-width: 480px) {
        width: 100%;
        height: 200px;
    }
`

export const Content = Styled.div`
    overflow-x: auto !important;
    white-space: nowrap !important;
    scrollbar-width: thin;
    scrollbar-color: #1e3c7282 #eee;
`

export const Element = Styled.div`
   width: 300px;
   display: inline-block;
   margin-right: 20px;
   white-space: normal;
   @media only screen and (max-width: 480px) {
       width: 250px;
   }
`

export const LoadingDiv = Styled.div`
    height: 318px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FlexBox = Styled.div`
    display: flex;
    height: 450px;
    color: #fff;
    @media only screen and (max-width: 768px) {
        overflow-x: auto !important;
        white-space: nowrap !important;
        scrollbar-width: thin;
        scrollbar-color: #1e3c7282 #eee;
    }
    @media only screen and (max-width: 480px) {
        height: 350px;
    }
`

export const Item1 = Styled.div`
    flex: 1;
    margin-right: 10px;
    color: #111;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 300;
    white-space: normal;
    @media only screen and (max-width: 768px) {
        display: inline-block;
        width: 170px;
        flex: unset;
        flex-shrink: 0;
    }
`

export const Item2 = Styled.div`
    flex: 1;
    height: 100%;
    background: ${props => 'url(' + props.src + ')'};
    width: 100%;
    background-size: cover;
    background-position: center center;
    padding: 0px 10px;
    margin-right: 10px;
    margin-left: 10px;
    padding: 20px 20px;
    border-radius: 10px;
    position: relative;
    border-radius: 10px;
    cursor: pointer;
    white-space: normal;
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #111;
        opacity: 0.5;
        border-radius: 10px;
    }
    @media only screen and (max-width: 768px) {
        width: 220px;
        flex: unset;
        display: inline-block;
        flex-shrink: 0;
    }
`

export const Item3 = Styled.div`
    flex: 1;
    height: 100%;
    background: ${props => 'url(' + props.src + ')'};
    width: 100%;
    background-size: cover;
    background-position: center center;
    padding: 0px 10px;
    margin-right: 10px;
    margin-left: 10px;
    padding: 20px 20px;
    border-radius: 10px;
    position: relative;
    border-radius: 10px;
    cursor: pointer;
    white-space: normal;
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #111;
        opacity: 0.5;
        border-radius: 10px;
    }
    @media only screen and (max-width: 768px) {
        width: 220px;
        flex: unset;
        display: inline-block;
        flex-shrink: 0;
    }
`

export const Item4 = Styled.div`
    flex: 1;
    height: 100%;
    background: ${props => 'url(' + props.src + ')'};
    width: 100%;
    background-size: cover;
    background-position: center center;
    padding: 0px 10px;
    margin-left: 10px;
    padding: 20px 20px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    white-space: normal;
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #111;
        opacity: 0.5;
        border-radius: 10px;
    }
    @media only screen and (max-width: 768px) {
        width: 220px;
        flex: unset;
        display: inline-block;
        flex-shrink: 0;
    }
`

export const NameCity = Styled.div`
    font-size: 30px;
    letter-spacing: 1px;
    position: relative;
    z-index: 1;
`

export const Quantity = Styled.div`
    font-size: 26px;
    position: relative;
    z-index: 1;
`

export const Sub = Styled.div`
    font-size: 24px;
`

export const Div = Styled.div`
    padding: 30px 0px;
    background: #eee;
`
