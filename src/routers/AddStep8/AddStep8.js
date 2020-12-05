import React, {useState, useEffect} from 'react';
import AddGymLayout from '../../layouts/AddGymLayout';
import { useParams } from 'react-router-dom';
import { FlexBox, Left, Right, ButtonPlace, Button, Form, Text, IconButtonWrap, BtnIcon, WrapperLoading, WrapperDialog} from './styles';
import { useHistory } from 'react-router-dom';
import background from '../../assets/images/3e277e36c26987b83e87efd18ce5c8ba.jpg';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getOneGymToUpdate, updateGym } from '../../api/gymApi';
import { getByGym, deleteMessage, addMessage, updateMessage } from '../../api/boxMessageApi';
import { connect } from 'react-redux';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import DialogConfirmDelete from '../../components/DialogConfirmDelete';
import { HOME_PATH } from '../../constants/Path';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackBar from '../../components/SnackBar';

const useStyles = makeStyles({
    table: {
      width: '100%'
    },
  });

const AddStep8 = ({profile}) => {
    const { id } = useParams();
    const history = useHistory();
    const [messages, setMessages] = useState([]);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [gym, setGym] = useState(null);
    const [openDialogError, setOpenDialogError] = useState(false);
    const [openDialogSave, setOpenDialogSave] = useState(false);
    const [openSnackBarSave, setOpenSnackBarSave] = useState(false);
    const [openSnackBarSaveFail, setOpenSnackBarSaveFail] = useState(false);
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

    const handleAddMessage = async (value) => {
        try {
            setLoading1(true);
            const res = await addMessage({...value, gym: id});
            setLoading1(false);
            if (res) {}
            setValue('question', '', {shouldValidate: false});
            setValue('answer', '', {shouldValidate: false});
            getMessByGym();
        } catch (error) {
            setLoading1(false);
            console.log(error)
        }
    }

    const getMessByGym = async () => {
        try {
            setLoading(true);
            const res = await getByGym(id);
            setLoading(false);
            setMessages(res.boxMessage);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    const deleteMessageApi = async (id) => {
        try {
            setLoading1(true);
            const res = await deleteMessage(id);
            setLoading1(false);
            if (res) {}
            setIdToDelete(null)
            getMessByGym();
        } catch (error) {
            setLoading1(false);
            console.log(error)
        }
    }

    useEffect(() => {
        const getOneGymApi = async (id) => {
            try {
                setLoading(true);
                const res = await getOneGymToUpdate(id);
                setLoading(false);
                if (res.gym.createBy._id === profile._id || profile.role === 'admin') {
                    const res1 = await getByGym(id);
                    setGym(res.gym);
                    setMessages(res1.boxMessage);
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

    const handleSave = () => {
        if (!gym.title
            || !(gym.addresses.addresses !== null)
              || !(gym.times.length > 0)
                || !(gym.utilities.length > 0)
                  || !gym.content > 0
                    || !(gym.gallery.length > 0)
            ) {
                setOpenDialogError(true);
            } else {
                setOpenDialogSave(true);
            }
    }

    const handleUpdate = async (value) => {
        setLoading1(true);
        await updateMessage(toUpdate._id, value);
        getMessByGym();
        setLoading1(false);
        setValue('question', '', {shouldValidate: false});
        setValue('answer', '', {shouldValidate: false});
        setToUpdate(null);
    }

    const handleSaveApi = async () => {
        try {
            setLoading1(true);
            const res = await updateGym(id, {...gym, complete: true});
            setLoading1(false);
            if (res) {
                setOpenSnackBarSave(true);
                history.push(`/profile/${gym.createBy._id}`)
            }
            setOpenDialogSave(false);
        } catch (error) {
            setLoading1(false);
            setOpenSnackBarSaveFail(true);
            setOpenDialogSave(false);
            console.log(error)
        }
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBarSave(false);
        setOpenSnackBarSaveFail(false);
    }

    return (
        <>
        <SnackBar open={openSnackBarSave} message="Thành công, vui lòng chờ quản trị viên duyệt" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarSaveFail} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        <DialogConfirmDelete 
            openDialog={open}
            handleCloseDialog={() => setOpen(false)}
            handleDisagree={() => setOpen(false)}
            handleAgree={() => deleteMessageApi(idToDelete)}
        />
        <Dialog
            open={openDialogError}
            onClose={() => setOpenDialogError(false)}
        >
            <WrapperDialog>
                <DialogTitle id="alert-dialog-title">Thiếu thông tin</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <BtnIcon icon={['fas', 'info-circle']} /> Vui lòng điền đầy đủ thông tin trước khi kết thúc
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button text="Ok" onClick={() => setOpenDialogError(false)} color="primary" autoFocus />
                </DialogActions>
            </WrapperDialog>
        </Dialog>
        <Dialog
            open={openDialogSave}
            onClose={() => setOpenDialogSave(false)}
        >
            <WrapperDialog>
                <DialogTitle id="alert-dialog-title">Xác nhận</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <BtnIcon icon={['fas', 'info-circle']} /> Xác nhận thêm phòng gym mới
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button text="Hủy" onClick={() => setOpenDialogSave(false)} color="primary" autoFocus />
                    <Button text="OK" onClick={handleSaveApi} color="primary" autoFocus />
                </DialogActions>
            </WrapperDialog>
        </Dialog>
        <AddGymLayout loading1={loading1} step8={true} gym={gym} id={id}>
            <FlexBox>
                <Left>
                    <Form>
                        {loading ? <WrapperLoading>
                            <MiniLoadingSpinner />
                        </WrapperLoading> : 
                        messages && messages.length > 0 && 
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>STT</strong></TableCell>
                                            <TableCell align="right"><strong>Câu hỏi</strong></TableCell>
                                            <TableCell align="right"><strong>Câu trả lời</strong></TableCell>
                                            <TableCell align="right"><strong>Action</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {messages.map((item, index) => (
                                        <TableRow key={item._id}>
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="right">{item.question}</TableCell>
                                            <TableCell align="right">{item.answer}</TableCell>
                                            <TableCell align="right">
                                                <IconButtonWrap
                                                    color="primary"
                                                    aria-label="upload picture"
                                                    component="span"
                                                    onClick={() => {setOpen(true); setIdToDelete(item._id)}}
                                                >
                                                    <BtnIcon icon={['fas', 'trash']} />
                                                </IconButtonWrap>
                                                <IconButtonWrap
                                                    color="primary"
                                                    aria-label="upload picture"
                                                    component="span"
                                                    onClick={() => {
                                                        setToUpdate(item); 
                                                        setValue('question', item.question, {shouldValidate: false});
                                                        setValue('answer', item.answer, {shouldValidate: false})
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
                        }
                        <div><label>Cài đặt hộp thư</label></div>
                        <Text>Thêm các cặp câu hỏi thường được hỏi và trả lời để khi người dùng có thể lựa chọn khi nhắn tin</Text>
                            <TextField
                                type="text"
                                name="question"
                                autoComplete="off"
                                label="Câu hỏi"
                                margin="normal"
                                placeholder="Ví dụ: Giá tiền của các khóa tập luyện"
                                inputRef={register({
                                    required: true,
                                })}
                                error={errors.question}
                                helperText={(errors.question &&
                                    errors.question.type === 'required' &&
                                    'Câu hỏi không được bỏ trống')}
                            />
                            <TextField
                                type="text"
                                name="answer"
                                autoComplete="off"
                                label="Câu trả lời"
                                margin="normal"
                                placeholder="Ví dụ: Yoga cơ bản: 2 triệu/tháng"
                                inputRef={register({
                                    required: true,
                                })}
                                error={errors.answer}
                                helperText={(errors.answer &&
                                    errors.answer.type === 'required' &&
                                    'Câu trả lời không được bỏ trống')}
                            />
                        <ButtonPlace>
                            <Button onClick={() => history.goBack()} text="Trở về"/>
                            {toUpdate && <Button onClick={() => {
                                setToUpdate(null);
                                setValue('question', '', {shouldValidate: false});
                                setValue('answer', '', {shouldValidate: false});
                            }} text="Hủy"/>}
                            {toUpdate && <Button onClick={handleSubmit(handleUpdate)} text="Sửa"/>}
                            {!toUpdate && <Button onClick={handleSubmit(handleAddMessage)} text="Thêm"/>}
                            <Button onClick={handleSave} text="Kết thúc"/>
                        </ButtonPlace>
                    </Form>
                </Left>
                <Right>
                    <img alt='img' src={background}/>
                </Right>
            </FlexBox>
        </AddGymLayout>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.userProfile,
    }
}

export default connect(mapStateToProps, null)(AddStep8);
