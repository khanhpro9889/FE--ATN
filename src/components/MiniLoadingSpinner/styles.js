import CircularProgress from '@material-ui/core/CircularProgress';
import Styled from 'styled-components';

export const Wrap = Styled.div`
  display: inline-block;
  .MuiCircularProgress-colorPrimary {
    color: #1e3c72;
    //margin-top: 20px;
  }
`

export const Spinner = Styled(CircularProgress)`

`