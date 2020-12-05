import React, {useState, useEffect} from 'react';
import AddGymLayout from '../../layouts/AddGymLayout';
import { useParams } from 'react-router-dom';
import { 
    FlexBox, 
    Left, 
    Right, 
    ButtonPlace,
    Button, 
    Form, 
    Textarea, 
    WrapperTable,
    IconButtonWrap,
    BtnIcon,
    WrapperLoading,
    ErrorText
} from './styles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import background from '../../assets/images/733-7336396_cartoon-yoga-practicing-teacher-teaching-transprent-yoga-cartoon.png';
import { updateGym, getOneGymToUpdate } from '../../api/gymApi';
import { connect } from 'react-redux';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { HOME_PATH } from '../../constants/Path';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      width: '100%'
    },
  });

const AddStep4 = ({profile}) => {
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const [services, setServices] = useState([]);
    const [gym, setGym] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorSave, setErrorSave] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [toUpdate, setToUpdate] = useState(null);
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
        const getOneGymApi = async (id) => {
            try {
                setLoading(true);
                const res = await getOneGymToUpdate(id);
                setLoading(false);
                if (res.gym.createBy._id === profile._id || profile.role === 'admin') {
                    setGym(res.gym);
                    setServices(res.gym.services);
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

    const deleteServiceItem = (id) => {
        setServices(services.filter(item => item._id !== id));
    }

    const onAddService = (value) => {
        setServices([...services, {...value, _id: services.length !== 0 ? (services[services.length - 1]._id + 1) : 1}])
        setValue('name', '', {shouldValidate: false});
        setValue('description', '', {shouldValidate: false});
        setErrorSave(false);
    }

    const handleSave = async () => {
        if (!services || services.length === 0) {
            setErrorSave(true);
        } else {
            try {
                setLoading1(true);
                const res = await updateGym(id, {...gym, services: services});
                setLoading1(false);
                if (res) {}
                history.push(`/add-a-gym/utilities/${id}`);
            } catch (error) {
                setLoading1(false);
                console.log(error);
            }
        }
    }

    const handleUpdate = (value) => {
        setServices(services.map(item => {
            if (item._id === toUpdate._id) {
                return {
                    ...item,
                    name: value.name,
                    description: value.description
                }
            }
            return item;
        }))
        setValue('name', '', {shouldValidate: false});
        setValue('description', '', {shouldValidate: false});
        setToUpdate(null);
    }

    return (
        <AddGymLayout loading1={loading1} step4={true} gym={gym} id={id}>
            <WrapperTable>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>STT</strong></TableCell>
                                <TableCell align="right"><strong>Tiêu đề</strong></TableCell>
                                <TableCell align="right"><strong>Mô tả</strong></TableCell>
                                <TableCell align="right"><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {loading ? <WrapperLoading>
                            <MiniLoadingSpinner />
                        </WrapperLoading> : services.map((item, index) => (
                            <TableRow key={item._id}>
                                <TableCell component="th" scope="row">
                                    <strong>{index + 1}</strong>
                                </TableCell>
                                <TableCell align="right">{item.name}</TableCell>
                                <TableCell align="right">{item.description}</TableCell>
                                <TableCell align="right">
                                    <IconButtonWrap
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                        onClick={() => deleteServiceItem(item._id)}
                                    >
                                        <BtnIcon icon={['fas', 'trash']} />
                                    </IconButtonWrap>
                                    <IconButtonWrap
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                        onClick={() => {
                                            setToUpdate(item); 
                                            setValue('name', item.name, {shouldValidate: false});
                                            setValue('description', item.description, {shouldValidate: false})
                                        }}
                                    >
                                        <BtnIcon icon={['fas', 'pen']} />
                                    </IconButtonWrap>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </WrapperTable>
            <FlexBox>
                <Left>
                    <Form>
                        <TextField
                            type="text"
                            name="name"
                            autoComplete="off"
                            label="Các lớp tập nhóm"
                            placeholder="Ví dụ: Yoga, Kick Boxing, Dance,..."
                            margin="normal"
                            inputRef={register({
                                required: true
                            })}
                            error={errors.name}
                            helperText={(errors.name &&
                                errors.name.type === 'required' &&
                                'Tên dịch vụ không được bỏ trống')}
                        />
                        <label>Mô tả</label>
                        <Textarea
                            rowsMin={5}
                            aria-label="content"
                            // defaultValue={event.content || null}
                            name="description"
                            ref={register}
                        />
                        {errorSave && <ErrorText>Vui lòng thêm các lớp học nhóm</ErrorText>}
                        <ButtonPlace>
                            <Button onClick={() => history.goBack()} text="Trở về"/>
                            <Button onClick={() => history.push(`/add-a-gym/utilities/${id}`)} text="Bỏ qua"/>
                            {toUpdate && <Button onClick={() => {
                                setToUpdate(null);
                                setValue('name', '', {shouldValidate: false});
                                setValue('description', '', {shouldValidate: false});
                            }} text="Hủy"/>}
                            {toUpdate && <Button onClick={handleSubmit(handleUpdate)} text="Sửa"/>}
                            {!toUpdate && <Button onClick={handleSubmit(onAddService)} text="Thêm"/>}
                            <Button onClick={handleSave} text="Lưu và tiếp tục"/>
                        </ButtonPlace>
                    </Form>
                </Left>
                <Right>
                    <img alt="img" src={background}/>
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

export default connect(mapStateToProps, null)(AddStep4);
