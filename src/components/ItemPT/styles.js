import Styled from 'styled-components';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const Wrapper = Styled.div`
    display: flex;
`

export const Left = Styled.div`
    flex: 1;
`

export const Right = Styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const ImgBox = Styled.div`
    border-radius: 50%;
    height: 80px;
    width: 80px;
    background: ${props => 'url(' + props.src + ')'};
    background-size: cover;
    background-position: center center;
`

export const Name = Styled.div`
    color: #1e3c72;
    font-weight: 600;
    font-size: 22px;
`

export const Contact = Styled.a`
    text-decoration: none;

`

export const Icon = Styled(FontAwesomeIcon)`
    font-size: 20px;
`