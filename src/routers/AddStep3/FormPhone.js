import React from 'react';
import { validatePhone } from '../../utils/form';
import { 
    ButtonPlace, 
    Button, 
    Form
} from './styles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

const FormPhone = ({onSubmit}) => {
    const {
        register,
        handleSubmit,
        errors,
        setValue,
    } = useForm({
        mode: 'onBlur',
        nativeValidation: false
    })

    const handleSubmitForm = (value) => {
        onSubmit(value);
        setValue('phone', '', {shouldValidate: false});
    }

    return (
        <Form>
            <TextField
                type="tel"
                name="phone"
                autoComplete="off"
                label="Số điện thoại liên hệ"
                margin="normal"
                inputRef={register({
                    required: true,
                    validate: validatePhone
                })}
                error={errors.phone}
                helperText={(errors.phone &&
                    errors.phone.type === 'required' &&
                    'Số điện thoại liên hệ không được bỏ trống') ||
                    (errors.phone &&
                        errors.phone.type === 'validate' &&
                        'Số điện thoại liên hệ không hợp lệ')}
            />
            <ButtonPlace>
                <Button type="submit" onClick={handleSubmit(handleSubmitForm)} text="Thêm số điện thoại"/>
            </ButtonPlace>
        </Form>
    );
};

export default FormPhone;