import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = Styled.div`
    
    min-height: calc(100vh - 80px);
`

export const Left = Styled.div`
    flex: 1.5;
    margin-right: 10px;
    height: calc(100vh - 80px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #1e3c7282 #eee;
    h3 {
        margin-top: 30px;
        margin-bottom: 30px;
    }
`

export const Right = Styled.div`
    flex: 1;
    margin-left: 10px;
    height: calc(100vh - 80px);
    .leaflet-container {
        width: 100%;
        height: 100%;
        position: sticky !important;
        top: 0px;
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

export const Date = Styled.div`
    font-size: 12px;
    font-style: italic;
    color: #777;
    margin-bottom: 3px;
    padding-left: 15px;
`

export const Stars = Styled.span`
    svg {
        color: #1e3c72
    }
`

export const IconStar = Styled(FontAwesomeIcon)`

`

export const HeaderLeft = Styled.div`
   
`

export const Body = Styled.div`
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding-left: 15px;
    padding-bottom: 15px;
`

export const Name = Styled.span`
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    padding-left: 15px;
`

export const TitleGym = Styled.div`
    a {
        text-decoration: none;
        color: #111;
        font-size: 22px;
    }
    margin-bottom: 15px;
    padding: 15px;
    border-bottom: 1px solid #1e3c72;
`

export const WrapperItem = Styled.div`
    box-shadow: 0px 0px 5px silver;
    border-radius: 5px;
    margin-bottom: 15px;
`