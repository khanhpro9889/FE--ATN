import React, {useState} from 'react';

import { RegisterWrap, Parents, Title } from './styles';
import RegisterForm from './RegisterForm';
import RegisterBanner from '../../assets/images/register-banner.jpg';
import SnackBar from '../../components/SnackBar';
import { signUp } from '../../api/authApi';
import { useHistory } from 'react-router-dom';

const Register = props => {
    const history = useHistory();
    const [openSnackBar, setOpenSnackBar] = useState(null);
    const [openSnackBarRegisterFail, setOpenSnackBarRegisterFail] = useState(false);
    const [loading, setIsLoading] = useState(false);

    const handleRegister = async (value) => {
        setIsLoading(true);
        const res = await signUp(value);
        setIsLoading(false);
        if(res.message === "Email exists") {
            setOpenSnackBar(true);
        } else {
            if(res.message === 'Waiting verify') {
                history.push(`/confirm?id=${res.uid}`);
            } else {
                setOpenSnackBarRegisterFail(true);
            }
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
        setOpenSnackBarRegisterFail(false);
    }

    return (
        <>
        <SnackBar open={openSnackBar} message="Email đã tồn tại" handleClose={handleCloseSnackBar} type="error"/>
        <SnackBar open={openSnackBarRegisterFail} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        <Parents src={RegisterBanner}>
            <RegisterWrap>
                <Title>Đăng ký</Title>
                <RegisterForm onSubmit={handleRegister} loading={loading}/>
            </RegisterWrap>
        </Parents>
        </>
    );
};

export default Register;