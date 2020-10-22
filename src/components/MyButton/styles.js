import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';

export const Btn = styled(Button)`
  cursor: pointer;
  background: #1e3c72 !important;
  color: #fff !important;
  border-radius: 5px;
  transition: 0.4s;
  font-weight: 500;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'calibri', sans-serif;
  box-shadow: none;
  text-transform: none !important;
  &:hover {
      background: none;
      color: #1e3c72;
  }
  svg {
    margin-left: 0px;
  }
`

export const Icon = styled(FontAwesomeIcon)`
  font-size: 20px;
  margin-left: 16px;
  margin-right: 10px;
`