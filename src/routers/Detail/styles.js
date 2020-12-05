import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '@material-ui/core/Select';

export const Wrapper = Styled.div`
    .image-gallery-image {
       
    }
    .image-gallery-play-button {
        display: none;
    }
`

export const View = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
`

export const Body = Styled.div`
    display: flex;
    margin-top: 20px;
    @media only screen and (max-width: 768px) {
        display: block;
    }
`

export const Left = Styled.div`
    flex: 2.5;
    margin-right: 10px;
    color: #000;
    border-radius: 8px;
    @media only screen and (max-width: 768px) {
        width: 100%;
        margin-right: 0px;
    }
`

export const Right = Styled.div`
    flex: 1;
    margin-left: 10px;
    padding: 15px;
    box-shadow: 0px 0px 10px silver;
    position: sticky;
    top: 10px;
    border-radius: 8px;
    height: min-content;
    @media only screen and (max-width: 768px) {
        width: 100%;
        margin-left: 0px;
        position: static;
        display: none;
    }
`


export const Title = Styled.div`
    margin-bottom: 0px;
    font-size: 40px;
    color: #000;
    letter-spacing: 1px;
    font-weight: 500;
    font-family: 'calibri', sans-serif;
    position: relative;
`

export const Icon = Styled(FontAwesomeIcon)`
  margin-right: 5px;
  font-size: 18px;
  color: #000;
  &.btn {
    cursor: pointer;
  }
`

export const SubTitle = Styled.div`
    font-size: 18px;
    margin-bottom: 10px;
`

export const Times = Styled.div`
    font-size: 18px;
    margin-bottom: 10px;
    display: flex;
`

export const LeftDiv = Styled.div`
    width: 130px;
`

export const RightDiv = Styled.div`
    width: calc(100% - 70px);
`

export const Content = Styled.div`
    font-size: 18px;
    margin-top: 20px;
    p {
        margin-top: 10px;
    }
    img {
        margin-top: 15px;
        margin-bottom: 15px;
        width: 100%;
    }
    line-height: 1.7em;
`

export const Date = Styled.div`
    font-size: 12px;
    color: #777;
    font-style: italic;
`

export const Name = Styled.div`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
    padding-top: 25px;
`

export const ReviewTablet = Styled.div`
    display: none;
    @media only screen and (max-width: 768px) {
        display: block;
    }
    margin-bottom: 20px;
`

export const MarginTop = Styled.div`
    margin-top: 15px;
`

export const Host = Styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding-bottom: 20px;
    border-bottom: 1px solid #1e3c72;
`

export const NameHost = Styled.div`
    font-size: 30px;
`

export const Item = Styled.div`
    margin-bottom: 7px;
    span {
        font-size: 20px;
    }
`

export const ProfileImage = Styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
`

export const ClearFix = Styled.div`
    overflow: auto;
`

export const FloatLeft = Styled.div`
    float: left;
    width: 22%;
    margin-right: 10px;
    margin-top: 15px;
`

export const IconLeft = Styled.div`
    display: inline-block;
    float: left;
    svg {
        color: #1e3c72;
        font-size: 22px;
    }
`

export const NameUtil = Styled.div`
    float: left;
    font-size: 20px;
`

export const Top = Styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`

export const TitleWrapper = Styled.div`
    
`

export const LeftTitle = Styled.div`
    display: flex;
    svg {
        color: #1e3c72;
    }
    .react-share__ShareButton {
        font-size: 20px !important;
    }
`

export const Save = Styled.div`
    margin-top: 20px;
    cursor: pointer;
    font-size: 20px;
    margin-right: 20px;
`

export const StyledSelect = Styled(Select)`
    border: 2px solid #1e3c72;
    border-radius: 10px;
`

export const FilterReview = Styled.div`
    display: flex;
    justify-content: flex-end;
    .MuiInput-underline.Mui-focused::after {
        display: none;
    }
    .MuiInputBase-root {
        background: #fff;
        padding-left: 20px;
        padding-right: 20px;
        position: relative;
        margin-left: 15px;
    }
    .MuiSelect-root {
        position:relative;
        overflow: unset !important;
    }
    .MuiSelect-selectMenu {
        font-family: 'calibri', sans-serif;
    }
    .MuiInput-underline::before {
        display: none;
    }
    margin-bottom: 20px;
`

export const WrapperDialog = Styled.div`
    h2 {
        font-size: 24px;
        text-transform: uppercase;
    }
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
`



export const FlexBox = Styled.div`
    display: flex;
    height: 260px;
    margin-bottom: 25px;
`

export const FlexBox1 = Styled.div`
    display: flex;
    margin-bottom: 25px;
`

export const LeftMap = Styled.div`
    flex: 2;
    .leaflet-container {
        width: 100%;
        height: 100%;
    }
`

export const RightMap = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding-left: 20px;
`

export const Element = Styled.div`
   width: 300px;
   display: inline-block;
   margin-right: 20px;
   @media only screen and (max-width: 480px) {
       width: 250px;
   }
`