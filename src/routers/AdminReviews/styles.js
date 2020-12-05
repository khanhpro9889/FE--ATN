import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

export const IconButtonWrap = Styled(IconButton)`
  background: #1e3c72 !important;
  color: #fff !important;
  padding: 6px 10px !important;
`

export const WrapperDialog = Styled.div`

`

export const Wrapper = Styled.div`
  width: 1200px;
  box-shadow: 0px 0px 5px silver;
  border-radius: 8px;
  min-height: calc(100vh - 120px);
  padding: 25px;
  @media only screen and (max-width: 768px) {
    padding: 10px;
    width: 350px;
  }
  .MuiTableContainer-root {
    margin-top: 25px;
    box-shadow: 0px 0px 3px silver;
    width: 100%;
    a {
      text-decoration: none;
      font-weight: bold;
    }
    .MuiTableCell-root {
    >div{
      cursor: pointer;
      font-weight: 600;
    }
  }
  }
`

export const Heading = Styled.div`
  position: relative;
  h1 {
    text-align: left;
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

export const Title = Styled.div`
  width: 100%;
  margin-top: 50px;
  text-align: center;
  div {
    text-align: center;
    font-size: 28px;
    color: #1e3c72;
    font-weight: 600;
  }
`

export const Icon = Styled(FontAwesomeIcon)`
  font-size: 18px;
  color: #1e3c72;
`

export const FlexBox = Styled.div`
  display: flex;
  margin-top: 20px;
  height: min-content;
`

export const Left = Styled.div`
  width: calc(100% - 80px);
  display: flex;
  min-height: 100px;
  border-radius: 8px;
  box-shadow: 0px 0px 5px silver;
  padding: 15px 0px;
`

export const Right = Styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const IconBtn = Styled(IconButton)`

`

export const Body = Styled.div`
  margin-top: 20px;
  width: 100vw;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 100px);
  margin-bottom: 20px;
`

export const LeftLeft = Styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    border-radius: 50%;
    object-fit: cover;
    width: 80px;
    height: 80px
  }
`

export const LeftRight = Styled.div`
  width: calc(100% - 100px);
  padding-left: 15px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  a {
    text-decoration: none;
    font-size: 20px;
    color: #111;
    font-weight: bold;
    @media only screen and (max-width: 480px) {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 480px) {
    padding-left: 5px;
  }
`

export const SubTitle = Styled.div`
  font-size: 16px;
  @media only screen and (max-width: 480px) {
    font-size: 12px;
  }
`

export const SearchBar = Styled.div`
    position: relative;
    text-align: right;
    .MuiInput-root::before {
        display: none;
    }
    .MuiInput-root::after {
        display: none;
    }
    input {
        border: 2px solid #1e3c72;
        border-radius: 18px;
        padding: 8px 5px;
        font-size: 16px;
        margin-top: 7px;
        padding-right: 37px;
        width: 250px;
    }
    @media only screen and (max-width: 768px) {
        margin-left: 0px;
        width 100%;
        margin-right: 0px;
        display: block;
    }
`

export const ButtonSearch = Styled(IconButton)`
    background: #1e3c72 !important;
    position: absolute !important;
    top: 27px;
    right: 6px;
    padding: 7px !important;
`

export const BtnIcon = Styled(FontAwesomeIcon)`
    color: #fff;
    font-size: 16px;
`