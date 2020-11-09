import  Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = Styled.div`
    margin-bottom: 15px;
    ${({ isReply }) => !isReply && `
        padding-left: 25px;
    `}
`

export const FlexBox = Styled.div`
    display: flex;
`

export const Left = Styled.div`
    width: 40px;
    display: flex;
`

export const Right = Styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
`

export const Avatar = Styled.img`
    width: 40px;
    height: 40px;
`

export const Name = Styled.span`
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
`

export const Date = Styled.div`
    font-size: 12px;
    font-style: italic;
    color: #777;
    margin-bottom: 3px;
`

export const Stars = Styled.span`

`

export const Icon = Styled(FontAwesomeIcon)`

`

export const Header = Styled.div`

`

export const Body = Styled.div`
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
`

export const Footer = Styled.div`

`

export const Button = Styled.div`
    margin-top: 3px;
    background: none;
    margin-right: 10px;
    display: inline-block;
    cursor: pointer;
    font-size: 12px;
    svg {
        color: #1e3c72;
        font-size: 14px;
        margin-right: 0px;
    }
    
` 

export const OptionChoice = Styled.div`
    float: right;
    display: inline-block;
    position: relative;
`

export const Menu = Styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 5px silver;
    position: absolute;
    bottom: -60px;
    right: 10px;
    padding: 5px;
    z-index: 3;
`

export const MenuItem = Styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
    padding-right: 5px;
    background: none;
    display: inline-block;
    cursor: pointer;
    font-size: 12px;
    svg {
        color: #1e3c72;
        font-size: 16px;
        margin-right: 0px;
    }
`