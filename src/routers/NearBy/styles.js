import Styled from 'styled-components';

export const Wrapper = Styled.div`
    display: flex;
    min-height: calc(100vh - 80px);
    @media only screen and (max-width: 768px) {
        display: block;
    }
`

export const Left = Styled.div`
    flex: 1.5;
    margin-right: 10px;
    height: calc(100vh - 80px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #1e3c7282 #eee;
    @media only screen and (max-width: 768px) {
        flex: unset;
        width 100%;
        margin-right: 0px;
        height: min-content;
        min-height: 400px;
    }
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
    @media only screen and (max-width: 768px) {
        margin-left: 0px;
        flex: unset;
        width 100%;
        margin-right: 0px;
        margin-bottom: 20px;
    }
    @media only screen and (max-width: 480px) {
        margin-left: 0px;
        flex: unset;
        width 100%;
        margin-right: 0px;
        height: 200px;
    }
`

export const LoadingDiv = Styled.div`
    //height: calc(100vh - 80px);
    >div {
        display: flex;
        justify-content: center;
        margin-top: 100px;
    }
`
