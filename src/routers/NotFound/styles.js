import Styled from 'styled-components';

export const Wrapper = Styled.div`
    width: 100vw;
    height: calc(100vh - 139px);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h1 {
        font-weight: 900;
        font-size: 150px;
        letter-spacing: 1.5;
    }
    h3 {
        font-size: 60px;
    }
    @media only screen and (max-width: 480px) {
        h1 {
            font-size: 48px;
        }
        h3 {
            font-size: 30px;
        }
    }
`

export const ButtonPlace = Styled.div`
    text-align: right;
    margin-top: 20px;
    button {
        margin-left: 10px;
    }
    button:nth-child(2) {
        background: #1e3c72 !important;
        color: #fff !important;
        border: 1px solid #1e3c72 !important;
    }
    button:nth-child(1) {
        background: #fff !important;
        color: #1e3c72 !important;
        border: 1px solid #1e3c72 !important;
    }
`