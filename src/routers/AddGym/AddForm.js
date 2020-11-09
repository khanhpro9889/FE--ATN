import React, {useState, useEffect}from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CkEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useForm } from 'react-hook-form';
import { validatePhone } from '../../utils/form';
import TextField from '@material-ui/core/TextField';
import { 
    Wrapper, 
    SubmitButton, 
    ErrorText, 
    Service,
    FloatLeft,
    ClearFix,
    FloatLeftUtil
 } from './styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RUG from 'react-upload-gallery'
import "react-upload-gallery/dist/style.css";
import createFileList from 'create-file-list';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import ServiceItem from '../../components/ServiceItem';
import AddServiceForm from './AddServiceForm';

const AddForm = ({
    provinces,
    districts,
    getDistrictsByProvince,
    handleAddGym,
    utilities,
    loading,
    back
}) => {
    const [content, setContent] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('-1');
    const [selectedDistrict, setSelectedDistrict] = useState('-1');
    const [gallery, setGallery] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedUtilities, setSelectedUtilities] = useState([]);

    const handleChangeEditor = (e, editor) => {
        setContent(editor.getData());
    }

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
        register({name: 'province'}, {required: true});
        register({name: 'district'}, {required: true});
    }, [register])

    const handleChangeProvinces = (e) => {
        setSelectedDistrict('-1');
        setValue('province', e.target.value);
        setSelectedProvince(e.target.value);
        getDistrictsByProvince(e.target.value);
    }

    const handleChangeDistricts = (e) => {
        setSelectedDistrict(e.target.value);
        setValue('district', e.target.value);
    }

    const handleAddService = (value) => {
        setServices([...services, {...value, id: services.length !== 0 ? (services[services.length - 1].id + 1) : 1}])
    }

    const handleChangeImages = (images) => {
        const Files = images.map(item => {
            return item.file;
        })
        setGallery(createFileList(...Files));
    }

    const onSubmit = (value) => {
        handleAddGym(value, gallery, content, services, selectedUtilities);
    }

    const deleteServiceItem = (id) => {
        setServices(services.filter(item => item.id !== id));
    }

    return (
        <Wrapper>
            <form>
                <TextField
                    type="text"
                    name="title"
                    autoComplete="off"
                    label="Tiêu đề"
                    margin="normal"
                    inputRef={register({
                        required: true
                    })}
                    error={errors.title}
                    helperText={(errors.title &&
                        errors.title.type === 'required' &&
                        'Tên không được bỏ trống')}
                />
                <label>Tỉnh/thành</label>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="province"
                    onChange={handleChangeProvinces}
                    value={selectedProvince}
                >
                    <MenuItem value='-1'>Chọn tỉnh/thành</MenuItem>
                    {provinces && provinces.map(item => {
                        return <MenuItem key={item.code} value={item._id}>{item.name}</MenuItem>
                    })}
                </Select>
                {errors.province && errors.province.type === "required" && <ErrorText>Không được bỏ trống tỉnh/thành</ErrorText>}
                <label>Quận/huyện</label>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="district"
                    onChange={handleChangeDistricts}
                    value={selectedDistrict}
                >
                    <MenuItem value='-1'>Chọn quận/huyện</MenuItem>
                    {districts && districts.map(item => {
                        return <MenuItem key={item.code} value={item._id}>{item.name}</MenuItem>
                    })}
                </Select>
                {errors.province && errors.district.type === "required" && <ErrorText>Không được bỏ trống quận/huyện</ErrorText>}
                <TextField
                    type="text"
                    name="address"
                    autoComplete="off"
                    label="Địa chỉ chi tiết"
                    margin="normal"
                    inputRef={register({
                        required: true
                    })}
                    error={errors.address}
                    helperText={(errors.address &&
                        errors.address.type === 'required' &&
                        'Địa chỉ chi tiết không được bỏ trống')}
                />
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
                <TextField
                    type="text"
                    name="facebook"
                    autoComplete="off"
                    label="Địa chỉ facebook"
                    margin="normal"
                    inputRef={register({
                        required: false
                    })}
                />
                <div><label>Thư viện hình ảnh</label></div>
                <RUG
                    accept={['jpg', 'jpeg', 'png']}
                    onChange={handleChangeImages}
                />
                <div><label>Dịch vụ</label></div>
                <Service>
                    {
                        services && services.map(item => {
                            return (
                                <FloatLeft>
                                    <ServiceItem deleteItem={deleteServiceItem} serviceItem={item}/>
                                </FloatLeft>
                            )
                        })
                    }
                    <FloatLeft>
                        <AddServiceForm onAddService={handleAddService}/>
                    </FloatLeft>
                </Service>
                <div><label>Tiện ích</label></div>
                {
                    <ClearFix>
                        {utilities && utilities.map(item => {
                            return (
                                <FloatLeftUtil>
                                    <FormControlLabel
                                        value={item._id}
                                        control={<Checkbox 
                                            onChange={(event) => {
                                                if(event.target.checked) {
                                                    setSelectedUtilities([...selectedUtilities, item._id])
                                                } else {
                                                    const newSelectedUtilities = selectedUtilities.filter(item => item !== item._id);
                                                    setSelectedUtilities(newSelectedUtilities);
                                                }
                                            }}
                                        />}
                                        label={item.name}
                                    />
                                </FloatLeftUtil>
                            )
                        })}
                    </ClearFix>
                }             
                <div><label>Giới thiệu</label></div>
                <CkEditor 
                    editor={ClassicEditor}
                    onInit={(editor) => {

                    }}
                    config={
                        {
                            ckfinder: {
                                uploadUrl: 'http://localhost:3001/upload-text-editor'
                            }
                        }
                    }
                    onChange={handleChangeEditor}
                />
                {loading ? <MiniLoadingSpinner /> : <SubmitButton text="Xác nhận" onClick={handleSubmit(onSubmit)}/>}
                <SubmitButton text="Trở về" onClick={(e) => {
                    e.preventDefault();
                    back();
                }}/>
            </form>
        </Wrapper>
    );
};

export default AddForm;