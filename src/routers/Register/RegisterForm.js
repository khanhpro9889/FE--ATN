import React from 'react';

import TextField from '@material-ui/core/TextField';
import { RegisterButton, StyledLink } from './styles';
import { LOGIN_PATH } from '../../constants/Path';
import { useForm } from 'react-hook-form';
import { validateEmail } from '../../utils/form';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';

const RegisterForm = ({onSubmit, loading}) => {
    const {
        register,
        handleSubmit,
        errors,
        watch,
    } = useForm({
    mode: 'onBlur',
    nativeValidation: false
    })
    
    return (
        <>
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
                type="text"
                name="name"
                autoComplete="off"
                label="Họ tên"
                margin="normal"
                inputRef={register({
                    required: true
                })}
                error={errors.name}
                helperText={(errors.name &&
                    errors.name.type === 'required' &&
                    'Tên không được bỏ trống')}
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
            {loading ? <MiniLoadingSpinner /> : <RegisterButton onClick={handleSubmit(onSubmit)} text="Đăng ký" />} hoặc <StyledLink to={LOGIN_PATH}>Đăng nhập</StyledLink>
        </form>
        </>
    );
};

export default RegisterForm;