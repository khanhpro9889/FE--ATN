import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = Styled.div`
    padding: 15px;
    box-shadow: 0px 0px 5px silver;
    color: #000;
    border-radius: 8px;
`

export const Name = Styled.span`
    font-size: 18px;
    font-weight: 600;
`

export const DeleteButton = Styled.span`
    float: right;
    cursor: pointer;
`

export const Description = Styled.div`
    font-size: 16px;
    line-height: 1.5em;
`

export const Price = Styled.div`

`

export const Icon = Styled(FontAwesomeIcon)`
    margin-right: 5px;
`