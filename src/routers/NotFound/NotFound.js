import React from 'react';
import { Wrapper, ButtonPlace } from './styles';
import MyButton from '../../components/MyButton';
import { HOME_PATH } from '../../constants/Path';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const history = useHistory();

    return (
        <Wrapper>
            <h1>Oops!</h1>
            <h3>404 - PAGE NOT FOUND</h3>
            <ButtonPlace>
                <MyButton text="Trở về" onClick={() => history.goBack()}/>
                <MyButton text="Trang chủ" onClick={() => history.push(HOME_PATH)}/>
            </ButtonPlace>
        </Wrapper>
    );
};

export default NotFound;