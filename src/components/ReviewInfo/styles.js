import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinearProgress } from '@material-ui/core'

export const SPReviewBox = Styled.div`
    >div {
        display: flex;
    justify-content: center;
    align-items: center;
    }
`

export const Rate = Styled.span`
  font-weight: bold;
  font-size: 48px;
  color: #1e3c72;
  margin-right: 20px;
  @media only screen and (max-width: 768px) {
    margin-right: 0;
  }
`

export const Star = Styled.span`
  color: #1e3c72;
  font-size: 40px;
`

export const Icon = Styled(FontAwesomeIcon)`
  margin-right: 5px;
  color: #1e3c72;
  &.btn {
    cursor: pointer;
  }
`

export const ReviewDesc = Styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #959595;
  font-size: 26px;
`

export const RateInfor = Styled.div`
  display: static;
  padding: 10px 10px;
  @media only screen and (max-width: 768px) {
    margin-top: 28px;
  }
`

export const RateBar = Styled.div`
  display: flex;
  margin-bottom: 6px;
  align-items: center;
  font-size: 14px;
  margin-top: 20px;
  color: #1e3c72;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    margin-left: 0;
  }
`

export const RateLine = Styled(LinearProgress)`
  width: 70%;
  margin-right: 8px;
  margin-left: 8px;
  &.MuiLinearProgress-colorPrimary {
    background: #eeeeee;
  }
  .MuiLinearProgress-barColorPrimary {
    background: #1e3c72;
  }
`