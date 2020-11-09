import Styled from 'styled-components';

export const Wrapper = Styled.div`
    display: flex;
    min-height: 100vh;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-top: 110px;
    @media only screen and (max-width: 768px) {
        display: block;
    }
`

export const Left = Styled.div`
    flex: 1;
    margin-right: 10px;
    padding: 15px;
    box-shadow: 0px 0px 5px silver;
    height: min-content;
    position: sticky;
    top: 10px;
    border-radius: 8px;
    @media only screen and (max-width: 768px) {
        width: 100%;
        margin-right: 0px;
        position: static;
    }
`

export const Right = Styled.div`
    flex: 2;
    margin-left: 10px;
    padding: 0px;
    box-shadow: 0px 0px 5px silver;
    border-radius: 8px;
    @media only screen and (max-width: 768px) {
        width: 100%;
        margin-left: 0px;
        margin-top: 10px;
    }
`

export const ProfileImages = Styled.div`
    background: ${props => 'url(' + props.src + ')'};
    background-size: cover;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    position: relative;
`

export const Avatar = Styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    bottom: -20px;
    border: 5px solid #fff;
`

export const Name = Styled.div`
    font-size: 48px;
    bottom: -90px;
    position: absolute;
`

