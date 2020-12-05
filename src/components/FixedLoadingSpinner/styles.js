import CircularProgress from '@material-ui/core/CircularProgress';
import Styled from 'styled-components';

export const Wrap = Styled.div`
  position: fixed;
  background: #fff;
  opacity: 0.8;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000000000;
  .MuiCircularProgress-colorPrimary {
    color: #1e3c72;
  }
`

export const Spinner = Styled(CircularProgress)`

`