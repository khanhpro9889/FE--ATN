import React, {useState, useEffect} from 'react';
import AddGymLayout from '../../layouts/AddGymLayout';
import { useParams } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { 
    FlexBox, 
    Left, 
    Right, 
    IconButtonWrap,
    BtnIcon,
    Title,
    Span ,
    Form,
    FormRow, 
    FormColRight, 
    FormColLeft,
    ButtonPlace, 
    Button, 
    ErrorText,
    WrapperLoading
} from './styles';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import FormPhone from './FormPhone';
import FormWeb from './FormWeb';
import TextField from '@material-ui/core/TextField';
import { validateTime24 } from '../../utils/form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { updateGym, getOneGymToUpdate } from '../../api/gymApi';
import { connect } from 'react-redux';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { HOME_PATH } from '../../constants/Path';

const AddStep3 = ({profile}) => {
    const { id } = useParams();
    const history = useHistory();
    const [phones, setPhones] = useState([]);
    const [webs, setWebs] = useState([]);
    const [times, setTimes] = useState([]);
    const [selectedTo, setSelectedTo] = useState('Thứ 2');
    const [selectedFrom, setSelectedFrom] = useState('Thứ 2');
    const [checked, setChecked] = useState(false);
    const [gym, setGym] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorSave1, setErrorSave1] = useState(false);
    const [errorSave2, setErrorSave2] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [days, setDays] = useState([
        'Thứ 2',
        'Thứ 3',
        'Thứ 4',
        'Thứ 5',
        'Thứ 6',
        'Thứ 7',
        'Chủ nhật',
    ]);
    const {
        register,
        handleSubmit,
        errors,
        setValue,
        watch
    } = useForm({
        mode: 'onBlur',
        nativeValidation: false
    })

    useEffect(() => {
        register({name: 'fromDay'});
        register({name: 'toDay'});
        setValue('fromDay', 'Thứ 2', {shouldValidate: false});
        setValue('toDay', 'Thứ 2', {shouldValidate: false});
    }, [register,setValue])

    useEffect(() => {
        const getOneGymApi = async (id) => {
            try {
                setLoading(true);
                const res = await getOneGymToUpdate(id);
                setLoading(false);
                if (res.gym.createBy._id === profile._id || profile.role === 'admin') {
                    setGym(res.gym);
                    setPhones(res.gym.phones);
                    setWebs(res.gym.facebooks);
                    setTimes(res.gym.times);
                    setChecked(res.gym.holiday);
                } else {
                    history.push(HOME_PATH);
                }
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
        }
        if (profile) {
            getOneGymApi(id);
        }
    }, [id, profile, history])

    const handleAddPhone = (value) => {
        setPhones([...phones, {phone: value.phone, _id: phones.length === 0 ? 1 : phones[phones.length - 1]._id + 1}]);
        setErrorSave1(false);
    }

    const handleDeletePhone = (id) => {
        setPhones(phones.filter(item => item._id !== id));
    }

    const handleAddWeb = (value) => {
        setWebs([...webs, {web: value.web, _id: webs.length === 0 ? 1 : webs[webs.length - 1]._id + 1}]);
    }

    const handleDeleteWeb = (id) => {
        setWebs(webs.filter(item => item._id !== id));
    }

    const handleAddTime = (value) => {
        setTimes([...times, {
            openTime: value.openTime, 
            closeTime: value.closeTime,
            fromDay: value.fromDay,
            toDay: value.toDay,
            _id: times.length === 0 ? 1 : times[times.length - 1]._id + 1
        }])
        setValue('fromDay', 'Thứ 2', {shouldValidate: false});
        setValue('toDay', 'Thứ 2', {shouldValidate: false});
        setValue('openTime', '', {shouldValidate: false});
        setValue('closeTime', '', {shouldValidate: false});
        setErrorSave2(false);
    }

    const handleDeleteTime = (id) => {
        setTimes(times.filter(item => item._id !== id))
    }

    const handleChangeFrom = (e) => {
        setSelectedFrom(e.target.value);
        setValue('fromDay', e.target.value);
        switch (e.target.value) {
            case 'Thứ 2':
                setSelectedTo('Thứ 2');
                setDays([
                    'Thứ 2',
                    'Thứ 3',
                    'Thứ 4',
                    'Thứ 5',
                    'Thứ 6',
                    'Thứ 7',
                    'Chủ nhật'
                ])
                break;
            case '-1':
                setDays([
                    'Thứ 2',
                    'Thứ 3',
                    'Thứ 4',
                    'Thứ 5',
                    'Thứ 6',
                    'Thứ 7',
                    'Chủ nhật'
                ])
                break;
            case 'Thứ 3':
                setSelectedTo('Thứ 3');
                setDays([
                    'Thứ 3',
                    'Thứ 4',
                    'Thứ 5',
                    'Thứ 6',
                    'Thứ 7',
                    'Chủ nhật'
                ])
                break;
            case 'Thứ 4':
                setSelectedTo('Thứ 4');
                setDays([
                    'Thứ 4',
                    'Thứ 5',
                    'Thứ 6',
                    'Thứ 7',
                    'Chủ nhật'
                ])
                break;
            case 'Thứ 5':
                setSelectedTo('Thứ 5');
                setDays([
                    'Thứ 5',
                    'Thứ 6',
                    'Thứ 7',
                    'Chủ nhật'
                ])
                break;
            case 'Thứ 6':
                setSelectedTo('Thứ 6');
                setDays([
                    'Thứ 6',
                    'Thứ 7',
                    'Chủ nhật'
                ])
                break;
            case 'Thứ 7':
                setSelectedTo('Thứ 7');
                setDays([
                    'Thứ 7',
                    'Chủ nhật'
                ])
                break;
            case 'Chủ nhật':
                setSelectedTo('Chủ nhật');
                setDays([
                    'Chủ nhật'
                ])
                break;
            default:
                break;
        }
    }

    const handleChangeTo = (e) => {
        setSelectedTo(e.target.value);
        setValue('toDay', e.target.value);
    }

    const handleSave = async () => {
        if (!phones || phones.length === 0) {
            setErrorSave1(true);
            console.log('aa')
        } 
        if (!times || times.length === 0) {
            setErrorSave2(true);
            console.log('aa')
        }
        if (phones.length > 0 && times.length > 0) {
            try {
                setLoading1(true);
                const res = await updateGym(id, {...gym, phones: phones, times: times, facebooks: webs, holiday: checked});
                setLoading1(false);
                if (res) {}
                history.push(`/add-a-gym/services/${id}`);
            } catch (error) {
                setLoading1(false);
                console.log(error);
            }
        }
    }

    return (
        <AddGymLayout loading1={loading1} step3={true} gym={gym} id={id}>
            <FlexBox>
                <Left>
                    <FormPhone onSubmit={handleAddPhone}/>
                    {errorSave1 && <ErrorText>Vui lòng điền số điện thoại</ErrorText>}
                    {loading ? <WrapperLoading>
                            <MiniLoadingSpinner />
                        </WrapperLoading> :
                        phones && phones.length > 0 && <div>
                            <Title>Danh sách số điện thoại</Title>
                            {phones.map((item) => {
                                return ( 
                                    <div key={item._id}>
                                        <Span>{item.phone}</Span>
                                        <IconButtonWrap
                                            color="primary"
                                            component="span"
                                            onClick={() => handleDeletePhone(item._id)}
                                        >
                                            <BtnIcon icon={['fas', 'trash']} />
                                        </IconButtonWrap>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <FormWeb onSubmit={handleAddWeb}/>
                    {loading ? <WrapperLoading>
                            <MiniLoadingSpinner />
                        </WrapperLoading> :
                        webs && webs.length > 0 && <div>
                            <Title>Danh sách trang web</Title>
                            {webs.map((item) => {
                                return ( 
                                    <div key={item._id}>
                                        <Span href={item.web}>{item.web}</Span>
                                        <IconButtonWrap
                                            color="primary"
                                            component="span"
                                            onClick={() => handleDeleteWeb(item._id)}
                                        >
                                            <BtnIcon icon={['fas', 'trash']} />
                                        </IconButtonWrap>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <Form>
                        <FormRow>
                            <FormColLeft>
                                <label className={(errors.fromDay && errors.fromDay.type === "required") ? 'error' : ''}>Từ thứ</label>
                                <Select
                                    name="fromDay"
                                    value={selectedFrom}
                                    onChange={handleChangeFrom}
                                >
                                    <MenuItem value='Thứ 2'>Thứ 2</MenuItem>
                                    <MenuItem value='Thứ 3'>Thứ 3</MenuItem>
                                    <MenuItem value='Thứ 4'>Thứ 4</MenuItem>
                                    <MenuItem value='Thứ 5'>Thứ 5</MenuItem>
                                    <MenuItem value='Thứ 6'>Thứ 6</MenuItem>
                                    <MenuItem value='Thứ 7'>Thứ 7</MenuItem>
                                    <MenuItem value='Chủ nhật'>Chủ nhật</MenuItem> 
                                </Select>
                                {(errors.fromDay && errors.fromDay.type === "required" && (watch('fromDay') === '-1'  || !watch('fromDay'))) && <ErrorText>Vui lòng chọn thứ</ErrorText>}
                            </FormColLeft>
                            <FormColRight>
                                <label className={(errors.toDay && errors.toDay.type === "required") ? 'error' : ''}>Đến thứ</label>
                                <Select
                                    name="toDay"
                                    value={selectedTo}
                                    onChange={handleChangeTo}
                                >
                                    {days.map(item => {
                                        return (
                                            <MenuItem key={item} value={item}>{item}</MenuItem>
                                        )
                                    })}
                                </Select>
                                {(errors.toDay && errors.toDay.type === "required") && <ErrorText>Vui lòng chọn thứ</ErrorText>}
                            </FormColRight>
                        </FormRow>
                        <FormRow>
                            <FormColLeft>
                                <TextField
                                    type="text"
                                    name="openTime"
                                    autoComplete="off"
                                    label="Giờ mở cửa (định dạng 24h)"
                                    margin="normal"
                                    placeholder="Ví dụ: 07:30"
                                    inputRef={register({
                                        required: true,
                                        validate: validateTime24
                                    })}
                                    error={errors.openTime}
                                    helperText={(errors.openTime &&
                                        errors.openTime.type === 'required' &&
                                        'Giờ mở cửa không được bỏ trống') ||
                                        (errors.openTime &&
                                            errors.openTime.type === 'validate' &&
                                            'Giờ không hợp lệ')}
                                />
                            </FormColLeft>
                            <FormColRight>
                                <TextField
                                    type="text"
                                    name="closeTime"
                                    autoComplete="off"
                                    label="Giờ đóng cửa (định dạng 24h)"
                                    margin="normal"
                                    placeholder="Ví dụ: 20:30"
                                    inputRef={register({
                                        required: true,
                                        validate: validateTime24
                                    })}
                                    error={errors.closeTime}
                                    helperText={(errors.closeTime &&
                                        errors.closeTime.type === 'required' &&
                                        'Giờ đóng cửa không được bỏ trống') ||
                                        (errors.closeTime &&
                                            errors.closeTime.type === 'validate' &&
                                            'Giờ không hợp lệ')}
                                />
                            </FormColRight>
                        </FormRow>
                        <ButtonPlace>
                            <Button onClick={handleSubmit(handleAddTime)} text="Thêm thời gian"/>
                        </ButtonPlace>
                    </Form>
                    {errorSave2 && <ErrorText>Vui lòng chọn thời gian</ErrorText>}
                    {loading ? <WrapperLoading>
                            <MiniLoadingSpinner />
                        </WrapperLoading> :
                        times && times.length > 0 && <div>
                            <Title>Giờ đóng cửa, mở cửa</Title>
                            {times.map((item) => {
                                return ( 
                                    <div key={item._id}>
                                        {item.fromDay !== item.toDay ?
                                            <Span>{item.fromDay} - {item.toDay}: {item.openTime} - {item.closeTime}</Span>
                                            : <Span>{item.fromDay}: {item.openTime} - {item.closeTime}</Span>
                                        }
                                        
                                        <IconButtonWrap
                                            color="primary"
                                            component="span"
                                            onClick={() => handleDeleteTime(item._id)}
                                        >
                                            <BtnIcon icon={['fas', 'trash']} />
                                        </IconButtonWrap>
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => {
                                    setChecked(event.target.checked)
                                }}
                                name="isHidden"
                                color="primary"
                            />
                        }
                        label="Ngày lễ nghỉ"
                    />
                    <br />
                    <ButtonPlace>
                        <Button onClick={() => history.goBack()} text="Trở về"/>
                        <Button onClick={handleSave} text="Lưu và tiếp tục"/>
                    </ButtonPlace>
                </Left>
                <Right>
                    <img alt="img" src='https://previews.123rf.com/images/djvstock/djvstock1904/djvstock190447722/121607879-men-practicing-outdoor-gym-vector-illustration-design.jpg' />
                </Right>
            </FlexBox>
        </AddGymLayout>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.userProfile,
    }
}

export default connect(mapStateToProps, null)(AddStep3);