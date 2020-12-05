import Styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = Styled.div`
    display: flex;
    min-height: 100vh;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-top: 110px;
    @media only screen and (max-width: 768px) {
        display: block;
    }
`

export const Left = Styled.div`
    flex: 1;
    margin-right: 10px;
    padding: 15px;
    box-shadow: 0px 0px 5px silver;
    height: min-content;
    border-radius: 8px;
    @media only screen and (max-width: 768px) {
        width: 100%;
        margin-right: 0px;
        position: static;
    }
`

export const Right = Styled.div`
    flex: 2;
    margin-left: 10px;
    padding: 0px;
    box-shadow: 0px 0px 5px silver;
    border-radius: 8px;
    @media only screen and (max-width: 768px) {
        width: 100%;
        margin-left: 0px;
        margin-top: 10px;
    }
`

export const ProfileImages = Styled.div`
    background: ${props => 'url(' + props.src + ')'};
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    position: relative;
`

export const Avatar = Styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    bottom: -20px;
    border: 5px solid #fff;
    @media only screen and (max-width: 480px) {
        width: 150px;
        height: 150px;
    }
`

export const Name = Styled.div`
    font-size: 48px;
    bottom: -90px;
    position: absolute;
    @media only screen and (max-width: 480px) {
        font-size: 30px;
        bottom: -55px;
    }
`

export const Children = Styled.div`
    padding: 15px;
`

export const MenuLink = Styled(Link)`
    text-decoration: none;
    font-size: 20px;
    width: 100%;
    width: 100%;
    display: inline-block;
    height: 100%;
    padding: 15px 0px;
`

export const MenuItem = Styled.div`
    flex: 1;
    text-align: center;
    border-right: 1px solid #1e3c72;
    ${({ active }) => active && `
        background: #1e3c72;
        a {
            color: #fff;
        }
    `}
`

export const Menu = Styled.div`
    display: flex;
    border-bottom: 1px solid #1e3c72;
    justify-content: center;
    div:last-child {
        border-right: none;
        border-top-right-radius: 8px;
    }
    div:first-child {
        border-top-left-radius: 8px;
    }
`

