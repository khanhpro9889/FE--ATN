import React, {useState, useEffect}from 'react';
import { useParams } from 'react-router-dom';
import { updateProfile } from '../../store/Profile/ProfileAction';
import { connect } from 'react-redux';
import ProfileLayout from '../../layouts/ProfileLayout';
import { Wrapper, ButtonAdd, Icon, Title, FlexBox, Left, Right, IconBtn, WrapperTab} from './styles';
import { getAllGymsByUser } from '../../api/gymApi';
import GymItem from '../../components/GymItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import DialogConfirmDelete from '../../components/DialogConfirmDelete';
import { deleteGym } from '../../api/gymApi';
import SnackBar from '../../components/SnackBar';
import { getUserProfileApi } from '../../api/userApi';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddGym from '../AddGym/AddGym';
import { getSavesByUser } from '../../api/saveApi';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component={'span'} variant={'body2'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ProfilePage = ({profile}) => {
    const { id } = useParams();
    const [gyms, setGyms] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
    const [selectedGym, setSelectedGym] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarDeleteFail, setOpenSnackBarDeleteFail] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [add, setAdd] = useState(false);
    const [saves, setSaves] = useState([]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {  
        fetchGyms(id);
        getUserProfile();
        const getSavesByUserApi = async (uid) => {
            try {
              const res = await getSavesByUser(uid);
              console.log(res);
              setSaves(res.saves);
            } catch(err) {
              console.log(err);
            }
        }
        getSavesByUserApi(id);
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
            setGyms(res.gyms);
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

    const deleteGymApi = async () => {
        try {
            await deleteGym(selectedGym);
            setOpenSnackBar(true);
            fetchGyms();
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
        setOpenSnackBar(false);
        setOpenSnackBarDeleteFail(false);
    }

    return (
        <>
        <SnackBar open={openSnackBar} message="Xóa thành công" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarDeleteFail} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        <DialogConfirmDelete 
            openDialog={openDialogConfirmDelete} 
            handleCloseDialog={handleCloseDialog}
            handleAgree={deleteGymApi}
            handleDisagree={handleCloseDialog}
        />
        <ProfileLayout userProfile={userProfile} loadingProfile={loadingProfile} getUserProfile={getUserProfile}>
            <Wrapper>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Phòng gyms" {...a11yProps(0)} />
                        <Tab label="Item Two" {...a11yProps(1)} />
                        <Tab label="Đã lưu" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <WrapperTab>
                        <TabPanel value={value} index={0}>
                            {!add ? <>
                                {(profile && (profile._id === id)) &&
                                    <div><ButtonAdd text="Thêm mới" onClick={() => setAdd(true)}/></div>
                                }
                                {loading && <LoadingSpinner />}
                                {gyms && gyms.length === 0 && <Title>
                                    <Icon icon={['fas', 'folder-open']}></Icon>
                                    <div>Bạn chưa đăng phòng gym nào</div>
                                </Title>}
                                {gyms && gyms.length > 0 && gyms.map(item => {
                                    return (
                                        <FlexBox key={item._id}>
                                            <Left>
                                                <GymItem gym={item}/>     
                                            </Left>
                                            {(!profile || (profile && (profile._id === id))) && <Right>
                                                <IconBtn onClick={() => handleDeleteGym(item._id)}>
                                                    <Icon icon={['fa', 'trash']} />
                                                </IconBtn>
                                                <IconBtn>
                                                    <Icon icon={['fa', 'pen']} />
                                                </IconBtn>
                                            </Right>}
                                        </FlexBox>
                                    )
                                })} </> : <AddGym profile={profile} back={() => setAdd(false)}/>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {saves.length === 0 && <Title>
                                <Icon icon={['fas', 'folder-open']}></Icon>
                                <div>Bạn chưa lưu phòng gym nào</div>
                            </Title>}
                            {saves && saves.map(item => {
                                return <GymItem key={item._id} gym={item.gym}/>
                            })}
                        </TabPanel>
                    </WrapperTab>
                </div>
            </Wrapper>
        </ProfileLayout>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.userProfile,
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