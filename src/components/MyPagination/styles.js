import Styled from 'styled-components';

export const Wrapper = Styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .MuiButtonBase-root {
        font-weight: 900;
        font-size: 14px
    }
    .MuiButtonBase-root:hover {
        text-decoration: underline;
    }
    .Mui-selected {
        background-color: #1e3c72 !important;
        color: #fff;
    }
    .Mui-disabled {
        display: none;
    }
    li:first-child {
        button {
            border-radius: 50% !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px !important;
            transition: box-shadow 0.2s ease 0s, -ms-transform 0.25s ease 0s, transform 0.25s ease 0s, transform 0.25s ease 0s !important;
            width: 32px !important;
            height: 32px !important;
        }
        button:hover {
            border-color: rgba(0, 0, 0, 0.08) !important;
            background-color: rgb(255, 255, 255) !important;
            color: rgb(0, 0, 0) !important;
            box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.12) 0px 6px 16px !important;
            transform: scale(1.04) !important;
        }
    }
    li:last-child {
        button {
            border-radius: 50% !important;
            border: 1px solid rgba(0, 0, 0, 0.08) !important;
            box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px !important;
            transition: box-shadow 0.2s ease 0s, -ms-transform 0.25s ease 0s, transform 0.25s ease 0s, transform 0.25s ease 0s !important;
            width: 32px !important;
            height: 32px !important;
        }
        button:hover {
            border-color: rgba(0, 0, 0, 0.08) !important;
            background-color: rgb(255, 255, 255) !important;
            color: rgb(0, 0, 0) !important;
            box-shadow: transparent 0px 0px 0px 1px, transparent 0px 0px 0px 4px, rgba(0, 0, 0, 0.12) 0px 6px 16px !important;
            transform: scale(1.04) !important;
        }
    }
`