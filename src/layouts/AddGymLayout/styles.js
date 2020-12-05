import Styled from 'styled-components';
import MyButton from '../../components/MyButton';

export const Wrapper = Styled.div`
    min-height: calc(100vh - 141px);
    padding-bottom: 50px;
`

export const WrapperLoading = Styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Bar = Styled.div`
    cursor: pointer;
    //height: 10px;
    background: #fff;
    border-left: 0.5px solid #fff;
    border-right: 0.5px solid #fff;
    flex: 1;
    text-align: center;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    ${({ active }) => active && `
        background: #1e3c72;
        color: #fff;
    `}
    ${({ active1 }) => active1 && `
        background: #302bc1;
        color: #fff;
    `}
`

export const Top = Styled.div`
    display: flex;
    border-bottom: 1px solid #1e3c72;
    border-top: 1px solid #1e3c72;
    margin-bottom: 30px;
`

export const Header = Styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`

export const Button = Styled(MyButton)``