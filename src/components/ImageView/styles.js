import Styled from 'styled-components';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const Wrapper = Styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    z-index: 401;
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0px;
        left: 0px;
        background: #000;
        opacity: 0.7;
    }
`

export const WrapperImg = Styled.div`
    max-width: 700px;
`

export const Img = Styled.img`
    width: 100%;
    position: relative;
    z-index: 31;
`

export const Icon = Styled(FontAwesomeIcon)`
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 50px;
    color: #fff;
    z-index: 30;
    cursor: pointer;
`