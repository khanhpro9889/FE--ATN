import React, {useState, useEffect} from 'react';
import { ConfirmWrap, Parents, Title, StyledLink, SubTitle, ResendButton } from './styles';
import RegisterBanner from '../../assets/images/register-banner.jpg';
import { useLocation, useHistory } from 'react-router-dom';
import { resendEmail } from '../../api/authApi';
import SnackBar from '../../components/SnackBar';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { LOGIN_PATH } from '../../constants/Path';
import { getUserProfileApi } from '../../api/userApi';

const Confirm = props => {
    const location = useLocation();
    const history = useHistory();
    const [id, setId] = useState('');
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarErr, setOpenSnackBarErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reconfirm, setReconfirm] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

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
        if (res.message === 'Waiting verify') {
            setOpenSnackBar(true);
            setDisableButton(true);
            setTimeout(() => {
                setDisableButton(false);
            }, 60000);
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
        const getUserProfile = async () => {
            const res = await getUserProfileApi(query.get('id'));
            if (res.isVerified) {
                history.push(LOGIN_PATH);
            }
        }
        getUserProfile();
        if(query.get('type') === 'reconfirm') {
            setReconfirm(true);
        }
        // eslint-disable-next-line
    }, [location.search])

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
                    <SubTitle>{loading ? <MiniLoadingSpinner /> : <ResendButton disabled={disableButton} text="Gửi lại email" onClick={handleResendEmail}/>}</SubTitle>
                </>) : (<>
                    <Title>Tài khoản chưa được xác nhận đăng ký</Title>
                    <SubTitle>Gửi email để xác nhận đăng ký</SubTitle>
                    <SubTitle>{loading ? <MiniLoadingSpinner /> : <ResendButton disabled={disableButton} text='Gửi email' onClick={handleResendEmail}/>}</SubTitle>
                    <SubTitle><StyledLink to={LOGIN_PATH}>Trở lại trang đăng nhập</StyledLink></SubTitle>
                </>)} 
            </ConfirmWrap>
        </Parents>
        </>
    );
};

export default Confirm;