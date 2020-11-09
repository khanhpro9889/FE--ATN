import Styled from 'styled-components';
import MyButton from '../MyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = Styled(FontAwesomeIcon)`
    font-size: 20px;
    width: 50px;
    color: #1e3c72;
`

export const ClearFix = Styled.div`
    overflow: auto;
`

export const IconDiv = Styled.div`
    width: 40px;
    text-align: left;
    display: inline-block;
    float: left;
`

export const ButtonEdit = Styled(MyButton)`
    background: #1e3c72;
    color: #fff;
    border-radius: 5px;
    border: 1px solid #1e3c72;
    transition: 0.4s;
    font-weight: 500;
    width: 100%;
    box-shadow: none;
    &:hover {
        background: none;
        color: #1e3c72;
    }
`

export const Wrapper = Styled.div`
    
`

export const Div = Styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ImgBox = Styled.div`
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
`

export const ImgProfile = Styled.img`
    border-radius: 50%;
    height: 150px;
    width: 150px;
    object-fit: cover;
`

export const Item = Styled.div`
    margin-bottom: 15px;
    font-size: 18px;
`

export const ButtonPlace = Styled.div`
    margin-top: 15px;
`

export const Info = Styled.div`
    div:last-child {
        margin-bottom: 0px;
    }
`

export const Title = Styled.div`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
`

export const Span = Styled.div`
    float: right;
    font-size: 18px;
    width: calc(100% - 40px);
`