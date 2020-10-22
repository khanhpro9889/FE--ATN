import Styled from 'styled-components';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { IconButton } from '@material-ui/core'

export const Parents = Styled.div`
    >div {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0px;
        left: 0px;
        background: #fff;
        z-index: 401;
    }
`

export const Wrapper = Styled.div`

`

export const FlexBox = Styled.div`
    display: flex;
    justify-content: space-between;
    height: 300px;
`

export const FlexBoxRight = Styled.div`
    display: flex;
    height: calc((100% - 15px) / 2);
    justify-content: space-between;
`

export const Left = Styled.div`
    width: calc((100% - 15px) / 2);
    height: 100%;
    img {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }
`

export const Right = Styled.div`
    width: calc((100% - 15px) / 2);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const LeftRight = Styled.div`
    width: calc((100% - 15px) / 2);
`

export const RightRight = Styled.div`
    width: calc((100% - 15px) / 2);
    position: relative;
    img {
        border-bottom-right-radius: 20px;
    }
`

export const RightRightTop = Styled.div`
    width: calc((100% - 15px) / 2);
    img {
        border-top-right-radius: 20px;
    }
`

export const Img = Styled.img`
    width: 100%;
    object-fit: cover;
    cursor: pointer;
    height: 100%;
    position: relative;
    z-index: -1;
`

export const BtnIcon = Styled(FontAwesomeIcon)`
    color: #1e3c72;
`

export const IconButtonWrap = Styled(IconButton)`
  background: #fff;
  color: #1e3c72;
  width: 40px;
  height: 40px;
  border: 1px solid #1e3c72 !important;
  ${({ hidden }) => !hidden && `
    opacity: 0;
    visibility: hidden;
`}
`

export const CloseBtn = Styled(IconButton)`
    position: absolute !important;
    top: 20px;
    right: 40px;
    font-size: 20px;
    color: #1e3c72;
    z-index: 30;
    border-radius: 0px !important;
`

export const Div = Styled.div`
    height: 100%;
    width: 100%;
    position: relative;
    &::after {
        cursor: pointer;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        transition: 0.4s;
        opacity: 0;
        visibility: hidden;
        z-index: 4;
    }
    &:hover::after {
        opacity: 0.4;
        visibility: visible;
    }
`

export const Button = Styled.div`
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid #1e3c72;
    color: #1e3c72;
    position: absolute;
    bottom: 10px;
    right: 15px;
    background: #fff;
    opacity: 0.8;
    font-size: 20px;
    border: none;
    cursor: pointer;
    z-index: 20;
`

export const WrapperImageView = Styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    z-index: 401;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 150px;
    padding-bottom: 150px;
`

export const WrapperImg = Styled.div`
    max-width: 700px;
`

export const Info = Styled.div`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
`

export const ImgImageView = Styled.img`
    width: 100%;
    position: relative;
    z-index: 31;
`

export const Icon = Styled(FontAwesomeIcon)`
    position: absolute;
    top: 20px;
    right: 40px;
    font-size: 50px;
    color: #1e3c72;
    z-index: 30;
    cursor: pointer;
`

export const MyIconButton = Styled(FontAwesomeIcon)`
    font-size: 18px;
    color: #1e3c72;
    z-index: 30;
    cursor: pointer;
`

export const ButtonIcon = Styled.button`
    border: none;
    border-radius: 5px;
    background: #fff;
    color: #1e3c72;
    border-radius: 50%;
    border: 1px solid #1e3c72;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ hidden }) => !hidden && `
        opacity: 0;
        visibility: hidden;
    `}
    cursor: pointer;
`
