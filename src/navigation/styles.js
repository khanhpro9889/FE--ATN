import Styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SearchIcon = Styled(FontAwesomeIcon)`
    color: #1e3c72;
`

export const Nav = Styled.nav`
    padding: 20px 0px;
    background: #fff;
    z-index: 1000;
    box-shadow: 0 4px 4px 0px #eee;
    @media only screen and (max-width: 768px) {
        padding-left: 20px;
        padding-right: 20px;
    }
    button {
        display: none;
        @media only screen and (max-width: 768px) {
            display: inline-block;
        }
    }
    .MuiInputBase-root {
        background: #fff;
        border-radius: 5px;
        padding: 5px 10px;
        width: 200px;
    }
    .MuiInputBase-root::before {
        border: none;
        display: none;
    }
    .MuiInputBase-root::after {
        border: none;
        display: none;
    }
    .MuiInputBase-root::before:hover {
        border: none;
    }
    .MuiInput-underline:hover:not(.Mui-disabled)::before {
        border: none;
    }
    input {
        color: #1e3c72;
        font-family: 'calibri', sans-serif;
    }
    input::-moz-placeholder {
        font-family: 'calibri', Arial, Helvetica, sans-serif;  
    }
    button svg {
        margin: 0px;
    }
`
export const NavItem = Styled(Link)`
    text-decoration: none;
    margin: 10px 0px;
    color: #1e3c72;
`

export const InnerNav = Styled.div`
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    justify-content: space-between;
    @media only screen and (max-width: 1200px) {
        padding-left: 20px;
        padding-right: 20px;
    }
    @media only screen and (max-width: 768px) {
        padding-left: 0px;
        padding-right: 0px;
    }
`

export const Menu = Styled.div`
    flex: 2;
    flex-direction: row;
    display: flex;
    justify-content: flex-end;
    >div:nth-child(1), >div:nth-child(2){
        margin-top: 10px;
    }
    @media only screen and (max-width: 768px) {
        display: none;
    }
    
`

export const WrapItem = Styled.div`
    margin-left: 20px;
    font-weight: 600;
    button {
        font-weight: 600;
        color: #1e3c72;
    }
    a {
        color: #1e3c72 !important;
    }
`

export const Brand = Styled.div`
    flex: 1;
    text-transform: uppercase;
    font-size: 26px;
    padding-top: 5px;
    font-weight: 600;
    a {
        color: #1e3c72 !important;
    }
`

export const Icon = Styled(FontAwesomeIcon)`
    margin-right: 10px;
    font-size: 28px;
`

export const IconBtn = Styled(FontAwesomeIcon)`
    font-size: 16px;
    margin-right: 10px;
`

export const Wrapper = Styled.div`
    
    
`

export const WrapItemDrawer = Styled.div`
    padding: 20px 10px;
    
`

export const NavItemDrawer = Styled(Link)`
    color: #1e3c72;
    text-decoration: none;
`

export const WrapperMenu = Styled.div`
    .MuiInputBase-root {
        background: #fff;
        border-radius: 5px;
        border: 1px solid #1e3c72;
        padding: 5px 10px;
        margin: 20px 0px;
        width: 100%;
    }
    input::-moz-placeholder {
        font-family: 'calibri', Arial, Helvetica, sans-serif;  
    }
    input {
        color: #1e3c72;
        font-family: 'calibri', sans-serif;
    }
    .MuiInputBase-root {
        background: #fff;
        border-radius: 5px;
        padding: 5px 10px;
    }
    .MuiInputBase-root::before {
        border: none;
        display: none;
    }
    .MuiInputBase-root::after {
        border: none;
        display: none;
    }
    .MuiInputBase-root::before:hover {
        border: none;
    }
    .MuiInput-underline:hover:not(.Mui-disabled)::before {
        border: none;
    }
`

export const WrapItemSearch = Styled.div`
    margin-left: 10px;
    margin-right: 10px;
`

export const LoginDrawer = Styled.div`
    display: flex;
    flex-direction: row;
    height: 100px;
`

export const LeftLogin = Styled.div`
    flex: 1;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const RightLogin = Styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    padding-left: 20px;
    a:nth-child(1) {
        font-size: 18px;
        font-weight: 600;
    }
    a {
        width: 100%;
        display: block;
    }
`

export const ImgProfile = Styled.img`
    width: 70px;
    border-radius: 50%;
`

export const LoginSection = Styled.div`
    width: 100%;
    
`

export const SubMenu = Styled.div`
    position: absolute;
    background: #fff;
    bottom: -78px;
    right: 0px;
    width: 150px;
    z-index: 300;
    box-shadow: 0px 0px 10px gray;
    opacity: 0;
    visibility: hidden;
    text-align: left;
`

export const AccountMenuWrapper = Styled.div`
    display: flex;
    cursor: pointer;
    position: relative;
    z-index: 300;
    &:hover ${SubMenu} {
        opacity: 1;
        visibility: visible;
    }
`

export const ImgProfileNav = Styled.img`
    border-radius: 50%;
    height: 40px;
    width: 40px;
    object-fit: cover;
`

export const Name = Styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    padding-left: 10px;
    color: #fff;
`



export const SubmenuItemWrapper = Styled.div`
    color: #1e3c72;
    padding: 10px 10px;
    transition: 0.4s;
    &:hover {
        background: #eee;
    }
`

export const SubmenuItem = Styled(Link)`
    color: #1e3c72 !important;
    text-decoration: none;
`

export const SignOutButton = Styled.div`
    font-weight: 600;
    color: #1e3c72 !important;
    cursor: pointer;
`

export const WrapItemLogin = Styled.div`
    text-align: center;
    padding-left: 10px;
    padding-right: 0px;
    a {
        display: block;
        font-weight: 600;
        color: #1e3c72;
    }
    a {
        color: #1e3c72;
    }
`

export const LoginButton = Styled(Link)`
    text-decoration: none;
    background: #96deda;
    padding: 10px 20px;
    top: 0px;
    right: 0px; 
`