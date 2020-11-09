import Styled from 'styled-components';
import MyButton from '../../components/MyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const Parents = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => 'url(' + props.src + ')'};
    background-position: center center;
    background-size: cover;
    min-height: 100vh;
    form {
        z-index:290;
        position: relative;
    }
    @media only screen and (max-width: 768px) {
        min-height: 100vh;
    }
`

export const LoginWrap = Styled.div`
    flex: 1;
    background: #fff;
    z-index: 290;
    margin: 0 auto;
    max-width: 700px;
    border-radius: 5px;
    padding: 20px 30px;
    opacity: 0.9;
    form {
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
    }
    @media only screen and (max-width: 768px) {
        margin-left: 20px;
        margin-right: 20px;
    }
`

export const Title = Styled.div`
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #1e3c72;
    margin-bottom: 20px;
`

export const LoginButton = Styled(MyButton)`
    border-radius: 5px;
    font-weight: 500;
    background: #1e3c72;
    color: #fff;
    transition: 0.4s;
    &:hover {
        background: none;
        color: #1e3c72;
    }
`

export const FlexBox = Styled.div`
    display: flex;
    @media only screen and (max-width: 480px) {
        display: block;
    }
`

export const Left = Styled.div`
    padding-right: 20px;
    flex: 1;
    border-right: 1px solid #1e3c72;
    @media only screen and (max-width: 480px) {
        border: none;
        padding-right: 0px;
    }
`
export const Right = Styled.div`
    flex: 1;
    padding-left: 20px;
    border-left: 1px solid #1e3c72;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 480px) {
        border: none;
        padding-left: 0px;
        margin-top: 30px;
    }
`

export const LoginWithFacebook = Styled.button`
    margin-top: 15px;
    width: 150px;
    background: #365899;
    border: none;
    padding: 10px 10px;
    font-family: 'calibri', sans-serif;
    color: #fff;
    margin-bottom: 10px;
    cursor: pointer;
`

export const LoginWithGoogle = Styled.button`
    width: 150px;
    background: #EA4335;
    font-family: 'calibri', sans-serif;
    border: none;
    padding: 10px 10px;
    color: #fff;
    cursor: pointer;
`

export const Icon = Styled(FontAwesomeIcon)`
    font-size: 16px;
    margin-right: 10px;
`

export const StyledLink = Styled(Link)`
    text-decoration: none;
    color: #1e3c72;
    font-weight: 500;
`

export const ResetLink = Styled(Link)`
    text-decoration: none;
    color: #1e3c72;
    font-weight: 500;
    font-size: 14px;
    position: absolute;
    right: 0px;
    top: 79px;
`