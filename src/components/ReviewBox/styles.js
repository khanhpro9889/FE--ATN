import Styled from 'styled-components';

export const LoadingWrapper = Styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const WrapperDialog = Styled.div`
    h2 {
        font-size: 24px;
        text-transform: uppercase;
    }
    .MuiDialogActions-root {
        button:nth-child(1) {
            background: #1e3c72;
            color: #fff;
            border: 1px solid #1e3c72;
        }
        button:nth-child(2) {
            background: #fff;
            color: #1e3c72;
            border: 1px solid #1e3c72;
        }
    }
`