import React, {useState, useEffect}from 'react';
import { useParams } from 'react-router-dom';
import { updateProfile } from '../../store/Profile/ProfileAction';
import { connect } from 'react-redux';
import ProfileLayout from '../../layouts/ProfileLayout';
import { Wrapper, ButtonAdd, Icon, Title, FlexBox, Left, Right, IconBtn, WrapperDialog, Section, SubTitle, LoadingDiv } from './styles';
import { getAllGymsByUser, addGym } from '../../api/gymApi';
import GymItem from '../../components/GymItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import DialogConfirmDelete from '../../components/DialogConfirmDelete';
import { deleteGym, deleteGym1st, deleteGym2nd } from '../../api/gymApi';
import SnackBar from '../../components/SnackBar';
import { getUserProfileApi } from '../../api/userApi';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import FixedLoadingSpinner from '../../components/FixedLoadingSpinner';
import { TextField } from '@material-ui/core';

const ProfilePage = ({profile, loaded}) => {
    const { id } = useParams();
    const [gyms, setGyms] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
    const [selectedGym, setSelectedGym] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarDeleteFail, setOpenSnackBarDeleteFail] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const history = useHistory();
    const [gym1, setGym1] = useState([]);
    const [gym2, setGym2] = useState([]);
    const [gym3, setGym3] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [openDialogCode, setOpenDialogCode] = useState(false);
    const [openDialogConfirmDeleteCode, setOpenDialogConfirmDeleteCode] = useState(false);
    const [code, setCode] = useState('');
    const [openSnackBarTimesup, setOpenSnackBarTimesup] = useState(false);

    const handleAddGym = async () => {
        try {
            const res = await addGym({uid: profile._id});
            history.push(`/add-a-gym/title/${res._id}`);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {  
        fetchGyms(id);
        getUserProfile();
         // eslint-disable-next-line
    }, [id])

    const getUserProfile = async () => {
        try {
            setLoadingProfile(true);
            const res = await getUserProfileApi(id);
            setLoadingProfile(false);
            setUserProfile(res);
        } catch (error) {
            setLoadingProfile(false);
            console.log(error);
        }
    }   

    const fetchGyms = async (id) => {
        try {
            setLoading(true);
            const res = await getAllGymsByUser(id);
            const g = res.gyms.map(item => {
                return (
                    {
                        ...item._doc,
                        reviews: item.reviews
                    }
                )
            })
            setGym1(g.filter(item => item.approve === true && item.complete === true));
            setGym2(g.filter(item => item.complete === false));
            setGym3(g.filter(item => item.complete === true && item.approve === false));
            setGyms(g);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    const handleDeleteGym = (id) => {
        setSelectedGym(id);
        setOpenDialogConfirmDelete(true);
    }

    const handleDeleteGymCode = (id) => {
        setSelectedGym(id);
        setOpenDialogConfirmDeleteCode(true);
    }

    const deleteGym1stApi = async () => {
        try {
            const res = await deleteGym1st(selectedGym, {email: profile.email});
            if (res) {}
            setOpenDialogCode(true);
        } catch (error) {
            setOpenSnackBarDeleteFail(false);
        }
    }

    const deleteGym2ndApi = async () => {
        try {
            const res = await deleteGym2nd(selectedGym, {token: code});
            if (res) {
                if (res.messages === 'Delete successfully') {
                    setOpenSnackBar(true);
                    setSelectedGym(null);
                    fetchGyms(id);
                    setOpenDialogCode(false);
                }
                if (res.data.messages === `Fail`) {
                    setOpenSnackBarDeleteFail(true);
                }
                if (res.data.messages === `time's up`) {
                    setOpenSnackBarTimesup(true);
                    setOpenDialogCode(false);
                }
            }
        } catch (error) {
            setOpenSnackBarDeleteFail(false);
        }
    }

    const deleteGymApi = async () => {
        try {
            setLoading1(true);
            await deleteGym(selectedGym);
            setLoading1(false);
            setSelectedGym(null);
            setOpenSnackBar(true);
            fetchGyms(id);
        } catch (err) {
            setOpenSnackBarDeleteFail(true);
            console.log(err);
        }
    }

    const handleCloseDialog = () => {
        setOpenDialogConfirmDelete(false);
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBarTimesup(false);
        setOpenSnackBar(false);
        setOpenSnackBarDeleteFail(false);
    }

    return (
        <>
        {loading1 && <FixedLoadingSpinner />}
        <SnackBar open={openSnackBar} message="Xóa thành công" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarTimesup} message="Mật mã đã hết hạn" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarDeleteFail} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        {/* form xác nhận thêm */}
        <Dialog
            open={openDialogAdd}
            onClose={() => setOpenDialogAdd(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <WrapperDialog>
                <DialogTitle id="alert-dialog-title">Xác nhận thêm phòng gym?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thêm 1 phòng gym trải qua 8 bước
                        <br />
                        Bạn có thực sự muốn thêm một phòng gym?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddGym} color="primary" autoFocus>
                        Đồng ý
                    </Button>
                    <Button onClick={() => setOpenDialogAdd(false)} color="primary">
                        Hủy
                    </Button>
                </DialogActions>
            </WrapperDialog>
        </Dialog>
        {/* form nhập code để xóa */}
        <Dialog
            open={openDialogCode}
            onClose={() => setOpenDialogAdd(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <WrapperDialog>
                <DialogTitle id="alert-dialog-title">Xác nhận xóa phòng gym?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Nhập code đã gửi vào email của bạn để xóa
                    </DialogContentText><br />
                    <TextField value={code} onChange={(e) => setCode(e.target.value)} max={4}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteGym2ndApi} color="primary" autoFocus>
                        Đồng ý
                    </Button>
                    <Button onClick={() => setOpenDialogCode(false)} color="primary">
                        Hủy
                    </Button>
                </DialogActions>
            </WrapperDialog>
        </Dialog>
        {/* form xác nhận xóa */}
        <DialogConfirmDelete 
            openDialog={openDialogConfirmDelete} 
            handleCloseDialog={handleCloseDialog}
            handleAgree={deleteGymApi}
            handleDisagree={handleCloseDialog}
        />
        {/* form xác nhận xóa code */}
        <DialogConfirmDelete 
            openDialog={openDialogConfirmDeleteCode} 
            handleCloseDialog={() => setOpenDialogConfirmDeleteCode(false)}
            handleAgree={deleteGym1stApi}
            handleDisagree={() => setOpenDialogConfirmDeleteCode(false)}
        />
        <ProfileLayout userProfile={userProfile} loadingProfile={loadingProfile} getUserProfile={getUserProfile} id={id}>
            <Wrapper>
            {(profile && (profile._id === id)) &&
                <div><ButtonAdd text="Thêm mới" onClick={() => setOpenDialogAdd(true)}/></div>
            }
                {loading && <LoadingSpinner />}
                {gyms && gyms.length === 0 && <Title>
                    <Icon icon={['fas', 'folder-open']}></Icon>
                    <div>Không có phòng gym nào</div>
                </Title>}
                {gym1 && gym1.length > 0 ? <Section>
                    <SubTitle>Phòng đang được hiển thị</SubTitle>
                    {gym1.map(item => {
                        return (
                            <FlexBox key={item._id}>
                                <Left>
                                    <GymItem gym={item}/>     
                                </Left>
                                {(!profile || (profile && (profile._id === id))) && <Right>
                                    <IconBtn onClick={() => handleDeleteGymCode(item._id)}>
                                        <Icon icon={['fa', 'trash']} />
                                    </IconBtn>
                                    <IconBtn onClick={() => history.push(`/add-a-gym/title/${item._id}`)}>
                                        <Icon icon={['fa', 'pen']} />
                                    </IconBtn>
                                </Right>}
                            </FlexBox>
                        )
                    })}
                </Section> : loaded && profile && profile._id !== id && <SubTitle>Không có phòng gym nào</SubTitle>}
                {!loaded ? <LoadingDiv>
                    <MiniLoadingSpinner />
                </LoadingDiv> : profile && profile._id === id && gym2 && gym2.length > 0 && <Section>
                    <SubTitle>Phòng bạn đang thêm</SubTitle>
                    {gym2.map(item => {
                        return (
                            <FlexBox key={item._id}>
                                <Left>
                                    <GymItem gym={item}/>     
                                </Left>
                                {(!profile || (profile && (profile._id === id))) && <Right>
                                    <IconBtn onClick={() => handleDeleteGym(item._id)}>
                                        <Icon icon={['fa', 'trash']} />
                                    </IconBtn>
                                    <IconBtn onClick={() => history.push(`/add-a-gym/title/${item._id}`)}>
                                        <Icon icon={['fa', 'pen']} />
                                    </IconBtn>
                                </Right>}
                            </FlexBox>
                        )
                    })}
                </Section>}
                {!loaded ? <LoadingDiv>
                    <MiniLoadingSpinner />
                </LoadingDiv> : profile && profile._id === id && gym3 && gym3.length > 0 && <Section>
                    <SubTitle>Phòng bạn đang chờ duyệt</SubTitle>
                    {gym3.map(item => {
                        return (
                            <FlexBox key={item._id}>
                                <Left>
                                    <GymItem gym={item}/>     
                                </Left>
                                {(!profile || (profile && (profile._id === id))) && <Right>
                                    <IconBtn onClick={() => handleDeleteGym(item._id)}>
                                        <Icon icon={['fa', 'trash']} />
                                    </IconBtn>
                                    <IconBtn onClick={() => history.push(`/add-a-gym/title/${item._id}`)}>
                                        <Icon icon={['fa', 'pen']} />
                                    </IconBtn>
                                </Right>}
                            </FlexBox>
                        )
                    })}
                </Section>}
            </Wrapper>
        </ProfileLayout>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.userProfile,
        loaded: state.ProfileReducer.loaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (profile) => {
            dispatch(updateProfile(profile))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);