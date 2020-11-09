import React from 'react';

import { 
    Title,
    PT, 
    FloatLeft, 
    Left, 
    Right, 
    FlexBox,
    IconButtonWrap,
    BtnIcon,
    HiddenInput,
    ImageBox,
    Wrapper
} from './styles';
import ProfileLayout from '../../layouts/ProfileLayout';
import { useForm } from 'react-hook-form';

const AddPT = props => {

    const {
        register,
        handleSubmit,
        errors,
        setValue,
        watch,
        control,
        getValues
    } = useForm({
        mode: 'onBlur',
        nativeValidation: false
    })

    return (
        <>
        <SnackBar open={openSnackBar} message="Thêm thành công" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarAddFail} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        <ProfileLayout>
            <Title>Thêm PT</Title>
            <Wrapper>
                <form>
                    <PT>
                        <FloatLeft>
                            <FlexBox>
                                <Left>
                                    <ImageBox></ImageBox>
                                    <HiddenInput
                                        accept="image/*"
                                        id="icon-button-file"
                                        type="file"
                                        multiple
                                        onChange={onSelectFile}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <IconButtonWrap
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span">
                                        <BtnIcon icon={['fas', 'pen']} />
                                        </IconButtonWrap>
                                    </label>
                                </Left>
                                <Right>
                                    <TextField
                                        type="text"
                                        name="namePT"
                                        autoComplete="off"
                                        label="Tên"
                                        margin="normal"
                                        inputRef={register({
                                            required: true
                                        })}
                                        error={errors.address}
                                        helperText={(errors.address &&
                                            errors.address.type === 'required' &&
                                            'Tên không được bỏ trống')}
                                    />
                                    <TextField
                                        type="text"
                                        name="phonePT"
                                        autoComplete="off"
                                        label="Số điện thoại"
                                        margin="normal"
                                        inputRef={register({
                                            validate: validatePhone
                                        })}
                                        error={errors.address}
                                        helperText={(errors.phone &&
                                                errors.phone.type === 'validate' &&
                                                'Số điện thoại liên hệ không hợp lệ')}
                                    />
                                    <TextField
                                        type="tel"
                                        name="phone"
                                        autoComplete="off"
                                        label="Địa chỉ facebook"
                                        margin="normal"
                                        inputRef={register({
                                        })}
                                        error={errors.phone}
                                    />
                                    <SubmitButton text="Thêm" onClick={handleSubmit(onSubmit)}/>
                                </Right>
                            </FlexBox>
                        </FloatLeft>
                    </PT>
                </form>
            </Wrapper>
        </ProfileLayout>
        </>
    );
};

export default AddPT;