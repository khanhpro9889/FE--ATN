import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = Styled.div`
    .image-gallery-image {
       
    }
    .image-gallery-play-button {
        display: none;
    }
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
    font-size: 16px;
    margin-bottom: 10px;
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