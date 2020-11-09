import Styled from 'styled-components';
import MyButton from '../MyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = Styled.div`
    width: 450px;
    height: 350px;
    position: fixed;
    bottom: 0px;
    right: 0px;
    z-index: 400;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 0.5px solid gray;
    @media only screen and (max-width: 480px) {
        width: 100%;
    }
`

export const Header = Styled.div`
    padding: 10px 20px;
    color: #1e3c72;
    box-shadow: 0px 0px 10px silver;
    cursor: pointer;
`

export const Body = Styled.div`
    display: flex;
    height: 100%;
`

export const Left = Styled.div`
    flex: 2;
    border-right: 0.5px solid silver;
    height: 100%;
    position: relative;
    @media only screen and (max-width: 480px) {
        flex: 3;
    }
`

export const Right = Styled.div`
    flex: 1;
    border-left: 0.5px solid silver;
    overflow-y: auto;
    height: 100%;
`

export const Name = Styled.div`
    color: #1e3c72;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 0.5px solid #eeeeee;
    height: 30px;
    padding-left:10px;
    line-height: 30px;
`

export const BoxMessage = Styled.div`
    overflow-y: auto;
    height: 230px;
    font-size: 16px;
    scrollbar-width: thin;
    scrollbar-color: #1e3c7282 #eee;
    .center {
        margin-top: 90px;
        text-align: center;
    }
    >div {
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
    }
`

export const Icon = Styled(FontAwesomeIcon)`

`

export const Parents = Styled.div`
    >div {
        width: 450px;
        height: 350px;
        position: fixed;
        bottom: 0px;
        right: 0px;
        z-index: 400;
    }
`

export const BoxSend = Styled.form`
    display: flex;
    padding: 10px;
    justify-content: space-between;
    input {
        flex: 10;
        padding: 5px 10px;
        margin-right: 5px;
        border-radius: 5px;
        border: 1px solid #1e3c72;
        width: 100%;
        padding-right: 30px;
    }
    label {
        cursor: pointer;
        margin-top: 5px;
    }
    div {
        position: relative;
        margin-right: 5px;
    }
    .upload-photo {
        opacity: 0;
        position: absolute;
        z-index: -1;
        z-index: 2;
        width: 10px;
        right: 0px;
        margin-right: 0px;
        width: 16px;
    }
`

export const Div = Styled.div`
    position: relative;
    flex: 9;
`

export const Upload = Styled.div`
    position: absolute !important;
    display: flex;
    align-items: center;
    right: 5px;
    top: 0px;
    cursor: pointer;
`

export const ButtonSend = Styled(MyButton)`
    background: #fff;
    padding: 5px 10px;
    color: #1e3c72;
    svg {
        margin-right: 0px;
    }
    border: none;
    padding: 2px 3px;
    &:hover {
        border: none;
    }
`

export const Conversation = Styled.div`
    padding: 10px;
    font-size: 14px;
    color: #1e3c72;
    transition: 0.4s;
    &:hover {
        background: #eee;
    }
    cursor: pointer;
`

export const DeleteMessage = Styled.div`
    position: absolute;
    z-index: 2;
    background: #eee;
    padding: 5px;
    border-radius: 5px;
    font-size: 10px;
    left: 0px;
    top: 10px;
    transition: 0.4s;
    opacity: 0;
    visibility: hidden;
    cursor: pointer;
`

export const Sender = Styled.div`
    margin-left: 10px;
    text-align: right;
    margin-top: 10px;
    position: relative;
    &:hover ${DeleteMessage} {
        opacity: 1;
        visibility: visible;
    }
`

export const Receiver = Styled.div`
    margin-top: 10px;
`

export const NameMessage = Styled.div`
    font-size: 10px;
    color: #1e3c72;
`

export const Time = Styled.div`
    font-size: 10px;
    color: #777777;
`

export const BodyMessage = Styled.div`
    font-size: 14px;
    word-break: break-all;
`

export const SeeMore = Styled.div`
    font-size: 14px;
    text-align: center;
    color: #1e3c72;
    cursor: pointer;
`

export const SelectedImage = Styled.div`
    position: absolute;
    bottom: 85px;
    left: 10px;
    width: 150px;
    img {
        width: 100%;
    }
    svg {
        position: absolute;
        right: 5px;
        top: 5px;
        color: #000;
        background: #fff;
    }
`

export const Image = Styled.div`
    width: 100%;
    cursor: pointer;
    img {
        width: 150px;
    }
`

