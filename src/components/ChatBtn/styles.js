import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styled from 'styled-components';

export const Icon = Styled(FontAwesomeIcon)`
    font-size: 16px;
    margin-right: 10px;
`

export const Wrapper = Styled.div`
    position: fixed;
    bottom: 0px;
    right: 20px;
    z-index: 400;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 0.5px solid gray;
    padding: 10px 20px;
    font-size: 20px;
    color: #fff;
    background: #1e3c72;
    cursor: pointer;
    >div {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #1e3c72;
        position: absolute;
        right: 10px;
        top: -10px;
        background: #fff;
    }
`