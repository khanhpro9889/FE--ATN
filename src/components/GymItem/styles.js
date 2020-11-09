import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const Wrap = Styled.div`
    display: flex;
`

export const WrapRight = Styled.div`
    flex: 2;
    padding-left: 20px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 0px 5px silver;
    padding-top: 10px;
    padding-bottom: 10px;
    @media only screen and (max-width: 768px) {
        padding-left: 10px;
    }
    @media only screen and (max-width: 480px) {
        padding-left: 20px;
    }
`

export const WrapLeft = Styled.div`
    flex: 1;
`

export const Thumnail = Styled.div`
    background: ${props => 'url(' + props.src + ')'};
    width: 100%;
    background-position: center center;
    background-size: cover;
    height: 140px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 100%;
`

export const Icon = Styled(FontAwesomeIcon)`
    color: green;
    margin-right: 10px;
`

export const Name = Styled(Link)`
    text-transform: uppercase;
    text-decoration: none;
    font-size: 22px;
    color: #1e3c72;
    font-weight: 600;
    cursor: pointer;
    @media only screen and (max-width: 768px) {
        font-size: 16px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 16px;
    }
    &:hover {
        color: #96deda;
    }
`

export const Address = Styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 16px;
    font-family: 'calibri', sans-serif;
    @media only screen and (max-width: 768px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 480px) {
        font-size: 14px;
    }
`