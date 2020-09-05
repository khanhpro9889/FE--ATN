import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { ConfirmWrap, Parents, Title, StyledLink, SubTitle, ResendButton } from './styles';
import RegisterBanner from '../../assets/images/register-banner.jpg';
import { useLocation } from 'react-router-dom';
import { resendEmail } from '../../api/authApi';
import SnackBar from '../../components/SnackBar';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { LOGIN_PATH } from '../../constants/Path';

const Confirm = props => {
    const location = useLocation();
    const [id, setId] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarErr, setOpenSnackBarErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reconfirm, setReconfirm] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [countDown, setCountDown] = useState(10);

    let interval;

    // useEffect(() => {
    //     if(countDown === 0) {
    //         setDisableButton(false);
    //     }
    // }, [countDown])

    // useEffect(() => {
    //     return () => {
    //         clearInterval(interval);
    //     }
    // })

    const handleResendEmail = async () => {
        setLoading(true);
        const res = await resendEmail({id: id});
        setLoading(false);
        setCountDown(10);
        if (res.message === 'Waiting verify') {
            setOpenSnackBar(true);
            setDisableButton(true);
            // interval = setInterval(() => {
            //     setCountDown((prev) => prev - 1);
            // }, 1000);
        } else {
            setOpenSnackBarErr(true);
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
        setOpenSnackBarErr(false);
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search); 
        setId(query.get('id'));
        if(query.get('type') === 'reconfirm') {
            setReconfirm(true);
        }
    }, [])

    return (
        <>
        <SnackBar open={openSnackBar} message="Đã gửi email" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarErr} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        <Parents src={RegisterBanner}>
            <ConfirmWrap>
                {!reconfirm ? (<>
                    <Title>Xác nhận tài khoản</Title>
                    <SubTitle>Email đã được gửi vào tài khoản email đã đăng ký của bạn. <br />Vui lòng xác nhận đăng ký</SubTitle>
                    <SubTitle><StyledLink to={LOGIN_PATH}>Trở lại trang đăng nhập</StyledLink></SubTitle>
                    <SubTitle>Chưa nhận được email?</SubTitle>
                    <SubTitle>{loading ? <MiniLoadingSpinner /> : <ResendButton text="Gửi lại email" onClick={handleResendEmail}/>}</SubTitle>
                </>) : (<>
                    <Title>Tài khoản chưa được xác nhận đăng ký</Title>
                    <SubTitle>Gửi email để xác nhận đăng ký</SubTitle>
                    <SubTitle>{loading ? <MiniLoadingSpinner /> : <ResendButton text='Gửi email' onClick={handleResendEmail}/>}</SubTitle>
                    <SubTitle><StyledLink to={LOGIN_PATH}>Trở lại trang đăng nhập</StyledLink></SubTitle>
                </>)} 
            </ConfirmWrap>
        </Parents>
        </>
    );
};

Confirm.propTypes = {
    
};

export default Confirm;