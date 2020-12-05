import React from 'react';
import { 
    ButtonPlace, 
    Button, 
    Form
} from './styles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';

const FormWeb = ({onSubmit}) => {
    const {
        register,
        handleSubmit,
        setValue,
    } = useForm({
        mode: 'onBlur',
        nativeValidation: false
    })

    const handleSubmitForm = (value) => {
        onSubmit(value);
        setValue('web', '', {shouldValidate: false});
    }

    return (
        <div>
            <Form>
                <TextField
                    type="text"
                    name="web"
                    autoComplete="off"
                    label="Link trang web (ví dụ: facebook, website...)"
                    margin="normal"
                    inputRef={register({
                        //required: true
                    })}
                    // error={errors.phone}
                    // helperText={(errors.phone &&
                    //     errors.phone.type === 'required' &&
                    //     'Số điện thoại liên hệ')}
                />
                <ButtonPlace>
                    <Button type="submit" onClick={handleSubmit(handleSubmitForm)} text="Thêm trang web"/>
                </ButtonPlace>
            </Form>
        </div>
    );
};

export default FormWeb;