import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

export const Wrapper = Styled.div`
  width: 750px;
  box-shadow: 0px 0px 5px silver;
  border-radius: 8px;
  min-height: calc(100vh - 120px);
  padding: 25px;
  @media only screen and (max-width: 768px) {
    padding: 10px;
    width: 350px;
  }
`

export const Heading = Styled.div`
  position: relative;
  h1 {
    text-align: center;
    @media only screen and (max-width: 480px) {
      font-size: 20px;
    }
  }
  &::after {
    position: absolute;
    content: '';
    right: 50%;
    transform: translateX(50%);
    height: 2px;
    width: 200px;
    background: #1e3c72;
    bottom: -10px;
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
    @media only screen and (max-width: 480px) {
      padding: 10px;
      width: 350px;
      font-size: 20px;
    }
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

export const Body = Styled.div`
  margin-top: 20px;
  width: 100vw;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 100px);
  margin-bottom: 20px;
`
