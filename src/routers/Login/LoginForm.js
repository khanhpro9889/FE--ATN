import React from 'react';

import TextField from '@material-ui/core/TextField';
import { LoginButton, StyledLink, ResetLink } from './styles';
import { REGISTER_PATH, RESET_PASSWORD_PATH } from '../../constants/Path';
import { useForm } from 'react-hook-form';
import { validateEmail } from '../../utils/form';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';

const LoginForm = ({onSubmit, loading}) => {
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({
    mode: 'onBlur',
    nativeValidation: false
    })
    return (
        <form>
            <TextField
                type="text"
                name="email"
                autoComplete="off"
                label="Email"
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
            <TextField
                type="password"
                name="password"
                autoComplete="off"
                label="Mật khẩu"
                margin="normal"
                inputRef={register({
                    required: true,
                    minLength: 7
                })}
                error={false}
                helperText={(errors.password &&
                    errors.password.type === 'required' &&
                    'Mật khẩu không được bỏ trống') ||
                  (errors.password &&
                    errors.password.type === 'minLength' &&
                    'Mật khẩu tối thiểu 7 ký tự')}
            />
            <ResetLink to={RESET_PASSWORD_PATH}>Quên mật khẩu?</ResetLink>
            {loading ? <MiniLoadingSpinner /> : <LoginButton onClick={handleSubmit(onSubmit)} text="Đăng nhập" />} hoặc <StyledLink to={REGISTER_PATH}>Đăng ký</StyledLink>
        </form>
    );
};

export default LoginForm;