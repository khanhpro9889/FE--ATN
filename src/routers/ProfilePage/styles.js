import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import MyButton from '../../components/MyButton';

export const Wrapper = Styled.div`
  .MuiBox-root {
    padding-left: 0px;
    padding-right: 0px;
  }
  .MuiTabs-indicator {
    background: #1e3c72;
  }
  .Mui-selected {
    background: #fff;
    color: #1e3c72;
    font-weight: bold;
  }
  header {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: #fff;
    color: #1e3c72;
    border-bottom: 1px solid #eee;
    box-shadow: none;
  }
`

export const WrapperTab = Styled.div`
  padding: 15px;
  padding-top: 0px;
`

export const ButtonAdd = Styled(MyButton)`
  background: #1e3c72;
  color: #fff;
  border-radius: 5px;
  transition: 0.4s;
  font-weight: 300;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'calibri', sans-serif;
  text-decoration: none;
  display: inline-block;
`

export const Title = Styled.div`
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
`

export const Left = Styled.div`
  flex: 7;
`

export const Right = Styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`

export const IconBtn = Styled(IconButton)`

`

export const Greeting = Styled.div`
  font-size: 44px;
`

export const WrapperDialog = Styled.div`
    .MuiDialogActions-root {
        button:nth-child(1) {
            background: #1e3c72;
            color: #fff;
            border: 1px solid #1e3c72;
        }
        button:nth-child(2) {
            background: #fff;
            color: #1e3c72;
            border: 1px solid #1e3c72;
        }
    }
    .MuiFormControl-root {
      width: 100%;
    }
    input {
      width: 100%;
      text-align: center;
      border: 2px solid #1e3c72;
      border-radius: 5px;
      padding: 10px 20px;
    }
`

export const Section = Styled.div`
  padding: 20px 0px;
`

export const SubTitle = Styled.h3`

`

export const LoadingDiv = Styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`