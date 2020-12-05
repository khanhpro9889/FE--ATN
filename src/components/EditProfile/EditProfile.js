import React, {useState, useEffect}from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Wrapper, 
    ImgProfile, 
    ImgBox, 
    ButtonEdit, 
    ButtonPlace, 
    HiddenInput,
    IconButtonWrap,
    BtnIcon,
    Textarea
 } from './styles';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { validatePhone } from '../../utils/form';
const EditProfile = ({profile, setEditProfile, updateProfile, provinces}) => {
    const [selectedFile, setSelectedFile] = useState()
    const [imageSrc, setImageSrc] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState('-1');

    const {
        register,
        handleSubmit,
        errors,
        setValue,
    } = useForm({
        mode: 'onBlur',
        nativeValidation: false
    })

    useEffect(() => {
        setValue('name', profile.name, {shouldValidate: false});
        setValue('email', profile.email, {shouldValidate: false});
        setValue('phone', profile.phone, {shouldValidate: false});
        setValue('about', profile.about, {shouldValidate: false});
        setValue('work', profile.work, {shouldValidate: false})
        if (profile.city) {
            setSelectedProvince(profile.city._id);
        }   
    }, [profile, setValue])

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return;
        }
        setSelectedFile(e.target.files[0])
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e) =>{
            setImageSrc(e.target.result);
        };
    }

    const handleChangeProvinces = async (e) => {
        setSelectedProvince(e.target.value);
    }

    const onSubmit = (value) => {
        if (selectedProvince !== -1) {
            return updateProfile({...value, city: selectedProvince}, selectedFile);
        }
        updateProfile({...value, city: null}, selectedFile);
    }

    return (
        <Wrapper>
            <form>
                <ImgBox>
                    <ImgProfile src={imageSrc || profile.profileImg}/>
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
                            component="span"
                        >
                            <BtnIcon icon={['fas', 'pen']} />
                        </IconButtonWrap>
                    </label>
                </ImgBox>
                <TextField
                    type="text"
                    name="name"
                    autoComplete="off"
                    label="Họ và tên"
                    margin="normal"
                    inputRef={register({
                        required: true
                    })}
                    error={false}
                    helperText={(errors.name &&
                        errors.name.type === 'required' &&
                        'Họ và tên không được bỏ trống')}
                />
                {/* <TextField
                    type="email"
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
                /> */}
                <TextField
                    type="text"
                    name="phone"
                    autoComplete="off"
                    label="Số điện thoại"
                    margin="normal"
                    inputRef={register({
                        validate: validatePhone
                    })}
                    error={errors.phone}
                    helperText={
                    (errors.phone &&
                        errors.phone.type === 'validate' &&
                        'Số điện thoại không hợp lệ')}
                />
                <TextField
                    type="text"
                    name="work"
                    autoComplete="off"
                    label="Nghề nghiệp"
                    margin="normal"
                    inputRef={register({
                        
                    })}
                    // error={errors.phone}
                    // helperText={
                    // (errors.phone &&
                    //     errors.phone.type === 'validate' &&
                    //     'Số điện thoại không hợp lệ')}
                />
                <label>Sinh sống tại</label>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="city"
                    onChange={handleChangeProvinces}
                    value={selectedProvince}
                >
                    <MenuItem value='-1'>Chọn tỉnh/thành</MenuItem>
                    {provinces.length > 0 && provinces.map(item => {
                        return <MenuItem key={item.code} value={item._id}>{item.name}</MenuItem>
                    })}
                </Select>
                <label>Giới thiệu</label>
                <Textarea
                    rowsMin={5}
                    aria-label="content"
                    placeholder="Giới thiệu"
                    // defaultValue={profile.content || null}
                    name="about"
                    ref={register}
                />
                <ButtonPlace>
                    <ButtonEdit onClick={handleSubmit(onSubmit)} text="Cập nhật"/>
                    <ButtonEdit onClick={() => {setEditProfile(false)}} text="Hủy" />
                </ButtonPlace>
            </form>
        </Wrapper>
    );
};

export default EditProfile;