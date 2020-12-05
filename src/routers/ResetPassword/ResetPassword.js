import React, {useState} from 'react';

import { Parents, ResetPasswordWrap, Title, SubTitle, SendEmailButton } from './styles';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { validateEmail } from '../../utils/form';
import RegisterBanner from '../../assets/images/register-banner.jpg';
import { resetPassword } from '../../api/authApi';
import SnackBar from '../../components/SnackBar';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';

const ResetPassword = props => {
    const {
        register,
        handleSubmit,
        errors,
        setValue,
    } = useForm({
    mode: 'onBlur',
    nativeValidation: false
    })
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarErr, setOpenSnackBarErr] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSendEmail = async (value) => {
        setLoading(true);
        const res = await resetPassword(value);
        setLoading(false);
        if(res.message === 'Waiting verify') {
            setOpenSnackBar(true);
        } else {
            setOpenSnackBarErr(true);
        }
        setValue('email', '', {shouldValidate: false});
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
        setOpenSnackBarErr(false);
    }

    return (
        <>
        <SnackBar open={openSnackBar} message="Đã gửi email" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarErr} message="Gửi mail thất bại" handleClose={handleCloseSnackBar} type="error"/>
        <Parents src={RegisterBanner}>
            <ResetPasswordWrap>
                <Title>Quên mật khẩu</Title>
                <SubTitle>Nhập email của bạn để reset lại mật khẩu</SubTitle>
                <form>
                    <TextField
                        type="text"
                        name="email"
                        autoComplete="off"
                        margin="normal"
                        inputRef={register({
                            required: true,
                            validate: validateEmail
                        })}
                        error={errors.email}
                        helperText={(errors.email &&
                            errors.email.type === 'required' &&
                            'Email không được bỏ trống') ||
                        (errors.email &&
                            errors.email.type === 'validate' &&
                            'Email không hợp lệ')}
                    />
                    <SubTitle>{loading ? <MiniLoadingSpinner /> : <SendEmailButton type="submit" text="Gửi" onClick={handleSubmit(handleSendEmail)}/>}</SubTitle>
                </form>
            </ResetPasswordWrap>
        </Parents>
        </>
    );
};

export default ResetPassword;