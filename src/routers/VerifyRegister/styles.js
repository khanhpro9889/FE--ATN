import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Parents = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => 'url(' + props.src + ')'};
    background-position: center center;
    background-size: cover;
    min-height: calc(100vh - 139px);
    form {
        z-index:290;
        position: relative;
    }
    @media only screen and (max-width: 768px) {
        min-height: 100vh;
    }
`

export const IconWrapper = Styled.div`
    text-align: center;
    margin-bottom: 20px;
`

export const RegisterWrap = Styled.div`
    flex: 1;
    background: #fff;
    z-index: 290;
    margin: 0 auto;
    max-width: 700px;
    border-radius: 5px;
    padding: 20px 30px;
    opacity: 0.9;
`

export const ButtonPlace = Styled.div`
    text-align: center;
    margin-top: 20px;
    button {
        margin-left: 10px;
 
    }
    button:nth-child(1) {
        background: #1e3c72 !important;
        color: #fff !important;
        border: 1px solid #1e3c72 !important;
    }
    button:nth-child(2) {
        background: #fff !important;
        color: #1e3c72 !important;
        border: 1px solid #1e3c72 !important;
    }
`

export const Icon = Styled(FontAwesomeIcon)`
    color: #1e3c72;
    font-size: 48px;
`

export const Title = Styled.div`
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    color: #1e3c72;
    margin-bottom: 20px;
`

export const LoadingDiv = Styled.div`
    height: 163.5px;
    display: flex;
    justify-content: center;
    align-items: center;
`