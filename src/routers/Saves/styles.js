import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = Styled.div`
    display: flex;
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
