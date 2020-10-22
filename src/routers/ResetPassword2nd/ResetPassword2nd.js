import React, {useState, useEffect} from 'react';

import { Parents, ResetPasswordWrap, Title, SubTitle, SendEmailButton, StyledLink } from './styles';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { resetPassword2nd } from '../../api/authApi';
import RegisterBanner from '../../assets/images/register-banner.jpg';
import { useLocation } from 'react-router-dom';
import SnackBar from '../../components/SnackBar';
import { LOGIN_PATH } from '../../constants/Path';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';

const ResetPassword2nd = props => {
    const {
        register,
        handleSubmit,
        errors,
        setValue,
        watch,
    } = useForm({
    mode: 'onBlur',
    nativeValidation: false
    })
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const location = useLocation();
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarErr, setOpenSnackBarErr] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (value) => {
        setLoading(true);
        const res = await resetPassword2nd({
            password: value.password,
            id,
            token
        });
        setLoading(false);
        if(res.message === 'Reset passwords successfuly') {
            
            setOpenSnackBar(true);
        } else {
            setOpenSnackBarErr(true);
        }
        setValue('password', '', {shouldValidate: false})
        setValue('confirmPassword', '', {shouldValidate: false})
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search); 
        setId(query.get('uid'));
        setToken(query.get('token'));
    }, [])

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
        setOpenSnackBarErr(false);
    }
    return (
        <>
        <SnackBar open={openSnackBar} message="Đổi mật khẩu thành công" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarErr} message="Đổi mật khẩu thất bại" handleClose={handleCloseSnackBar} type="error"/>
        <Parents src={RegisterBanner}>
            <ResetPasswordWrap>
                <Title>Đổi mật khẩu</Title>
                <form>
                    <TextField
                        type="password"
                        name="password"
                        autoComplete="off"
                        label="Mật khẩu mới"
                        margin="normal"
                        inputRef={register({
                            required: true,
                            minLength: 7
                        })}
                        error={errors.password}
                        helperText={(errors.password &&
                            errors.password.type === 'required' &&
                            'Password không được bỏ trống') ||
                        (errors.password &&
                            errors.password.type === 'minLength' &&
                            'Password phải có ít nhất 7 ký tự')}
                    />
                    <TextField
                        type="password"
                        name="confirmPassword"
                        autoComplete="off"
                        // value={email}
                        label="Nhập lại mật khẩu"
                        margin="normal"
                        inputRef={register({
                            required: true,
                            validate: (value) => value === watch('password')
                        })}
                        error={errors.confirmPassword}
                        helperText={
                            (errors.confirmPassword &&
                            errors.confirmPassword.type === 'required' &&
                            'Xác nhận mật khẩu không được bỏ trống') ||
                            (errors.confirmPassword &&
                            errors.confirmPassword.type === 'validate' &&
                            'Mật khẩu không khớp')}
                    />
                    <SubTitle>{loading ? <MiniLoadingSpinner /> : <SendEmailButton type="submit" text="Xác nhận" onClick={handleSubmit(handleChangePassword)}/>}</SubTitle>
                    <StyledLink to={LOGIN_PATH}>Trở về trang đăng nhập</StyledLink>
                </form>
            </ResetPasswordWrap>
        </Parents>
        </>
    );
};

export default ResetPassword2nd;