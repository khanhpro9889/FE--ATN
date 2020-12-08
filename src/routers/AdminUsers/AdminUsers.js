import React, {useState, useEffect}from 'react';
import { Wrapper, LoadingDiv, Icon, Title, IconBtn, Body, Heading, SearchBar, ButtonSearch, BtnIcon, WrapperDialog } from './styles';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { getAllUser, deleteUser, changeRole } from '../../api/userApi';
import DialogConfirmDelete from '../../components/DialogConfirmDelete';
import SnackBar from '../../components/SnackBar';
import MyPagination from '../../components/MyPagination';
import { useHistory, useLocation } from 'react-router-dom';
import FixedLoadingSpinner from '../../components/FixedLoadingSpinner';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MyButton from '../../components/MyButton';
import { parseDate } from '../../utils/date';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditProfile from '../../components/EditProfile';
import { updateProfileApi } from '../../api/userApi';
import { getProvinces } from '../../api/province-districtAPI';

const AdminApprove = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarDeleteFail, setOpenSnackBarDeleteFail] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [openSnackBarChangeRole, setOpenSnackBarChangeRole] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const [totalUser, setTotalUser] = useState(0);
    const [searchContent, setSearchContent] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {  
        const params = new URLSearchParams(location.search);
        const page = params.get('page');
        const search = params.get('search');
        if (page) {
            setCurrentPage(parseInt(page));
        } else {
            setCurrentPage(1);
        }
        if (search) {
            setSearchContent(search)
        } else {
            setSearchContent('');
        }
        getAllUser(page || 1, search || '').then(res => {
            setUsers(res.users);
            setTotalPage(res.totalPage);
            setCurrentPage(res.currentPage);
            setTotalUser(res.totalUser);
            history.push(location.pathname + `?page=${page || 1}&search=${search || ''}`);
            setLoading(false);
        }).catch(err => setLoading(false));
        const getProvincesFromApi = async () => {
            try {
                const pro = await getProvinces();
                setProvinces(pro);
            } catch (err) {
                setProvinces([]);
            }
        }
        getProvincesFromApi();
         // eslint-disable-next-line
    }, [])

    const handleUpdateProfile = async (value, image) => {
        const formData = new FormData();
        formData.append('name', value.name);
        formData.append('email', value.email);
        formData.append('phone', value.phone);
        formData.append('avatar', image);
        formData.append('about', value.about);
        formData.append('work', value.work);
        formData.append('city', value.city);
        formData.append('isHidden', value.isHidden);
        setLoading(true);
        const res = await updateProfileApi(profile._id, formData);
        setLoading(false);
        if(res.message === 'Update successfully') {
            setOpenSnackBarChangeRole(true);
            setOpenDialog(false);
            getAllUserApi(currentPage, searchContent);
            //updateProfile(res.user);
        }
    }

    const getAllUserApi = async (currentPage, search) => {
        try {
          setLoading(true);
          const res = await getAllUser(currentPage, search || '');
          setLoading(false);
          setUsers(res.users);
          setTotalPage(res.totalPage);
          setCurrentPage(res.currentPage);
        } catch(err) {
          setLoading(false);
          console.log(err);
        }
    }

    const handleDeleteGym = (id) => {
        setSelectedUser(id);
        setOpenDialogConfirmDelete(true);
    }

    const handleSearch = async () => {
        const res = await getAllUser(1, searchContent);
        history.push(`${location.pathname}?page=${1}&search=${searchContent}`)
        setUsers(res.users);
        setCurrentPage(res.currentPage);
        setTotalPage(res.totalPage);
        setTotalUser(res.totalUser);
    }

    const handleChangeRole = async (id, role) => {
        try {
            setLoading1(true);
            await changeRole(id, {role});
            setLoading1(false);
            getAllUserApi(currentPage, searchContent);
            setOpenSnackBarChangeRole(true);
        } catch (err) {
            setLoading1(true);
            setOpenSnackBarDeleteFail(true);
            console.log(err);
        }
    }

    const deleteUserApi = async () => {
        try {
            setLoading1(true);
            await deleteUser(selectedUser);
            setLoading1(false);
            setOpenSnackBar(true);
            getAllUserApi(currentPage, searchContent);
        } catch (err) {
            setOpenSnackBarDeleteFail(true);
            setLoading1(false);
            console.log(err);
        }
    }

    const handleChangePage = async (e, value) => {
        setLoading(true);
        const res = await getAllUser(value, searchContent);
        setUsers(res.users);
        setTotalPage(res.totalPage);
        setCurrentPage(value);
        setTotalUser(res.totalUser);
        history.push(location.pathname + `?page=${value}&search=${searchContent}`);
        setLoading(false);
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
        setOpenSnackBarChangeRole(false);
    }

    return (
        <>
        <SnackBar open={openSnackBar} message="Xóa thành công" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarDeleteFail} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        <SnackBar open={openSnackBarChangeRole} message="Cập nhật thành công" handleClose={handleCloseSnackBar} type="success"/>
        <DialogConfirmDelete 
            openDialog={openDialogConfirmDelete} 
            handleCloseDialog={handleCloseDialog}
            handleAgree={deleteUserApi}
            handleDisagree={handleCloseDialog}
        />
        {loading1 && <FixedLoadingSpinner />}
        <Body>
            <Wrapper>
                <Heading><h1>Tất cả người dùng ({totalUser})</h1></Heading>
                {loading ? <LoadingDiv><MiniLoadingSpinner /></LoadingDiv> 
                    : <>
                        <SearchBar>
                            <TextField
                                type="text"
                                name="address"
                                autoComplete="off"
                                margin="normal"
                                placeholder="Tên người dùng"
                                onChange={(e) => setSearchContent(e.target.value)}
                                value={searchContent}
                            />
                            <ButtonSearch
                                type="submit"
                                component="span"
                                onClick={handleSearch}
                            >
                                <BtnIcon icon={['fas', 'search']} />
                            </ButtonSearch>
                        </SearchBar>
                        {users.length === 0 ? <Title>
                            <Icon icon={['fas', 'folder-open']}></Icon>
                            <div>Không có người dùng</div>
                        </Title> : <>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>STT</strong></TableCell>
                                            <TableCell align="center"><strong>Tên</strong></TableCell>
                                            <TableCell align="center"><strong>Email</strong></TableCell>
                                            <TableCell align="center"><strong>Tổng số bài đăng</strong></TableCell>
                                            <TableCell align="center"><strong>Tổng số đánh giá</strong></TableCell>
                                            <TableCell align="center"><strong>Đã xác nhận</strong></TableCell>
                                            <TableCell align="center"><strong>Ngày tạo</strong></TableCell>
                                            <TableCell align="center"><strong>Action</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((item, index) => {
                                            return (
                                                <TableRow key={item._id}>
                                                    <TableCell component="th" scope="row">
                                                        <strong>{index + 1}</strong>
                                                    </TableCell>
                                                    <TableCell align="center"><strong>{item.name}</strong></TableCell>
                                                    <TableCell align="center">{item.email}</TableCell>
                                                    <TableCell align="center">{item.gyms} bài đăng</TableCell>
                                                    <TableCell align="center">{item.reviews} đánh giá</TableCell>
                                                    <TableCell align="center">{item.isVerified ? 'Đã xác nhận Email' : <strong>Chưa xác nhận Email</strong>}</TableCell>
                                                    <TableCell align="center">{parseDate(item.createAt)}</TableCell>
                                                    <TableCell align="right">
                                                        <MyButton text={item.role === 'admin' ? `Admin` : 'User'} onClick={() => handleChangeRole(item._id, item.role === 'admin' ? `user` : 'admin')}/>
                                                        <IconBtn onClick={() => history.push(`/profile/${item._id}`)}>
                                                           <Icon icon={['fa', 'eye']} />
                                                        </IconBtn>
                                                        <IconBtn onClick={() => handleDeleteGym(item._id)}>
                                                           <Icon icon={['fa', 'trash']} />
                                                        </IconBtn>
                                                        <IconBtn onClick={() => {setProfile(item); setOpenDialog(true)}}>
                                                           <Icon icon={['fa', 'pen']} />
                                                        </IconBtn>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer></>}
                        {totalPage > 1 && <MyPagination totalPage={totalPage} currentPage={currentPage} onChange={handleChangePage}/>}
                    </>
                }
            </Wrapper>
        </Body>
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <WrapperDialog>
                <DialogTitle id="alert-dialog-title"><strong>Sửa người dùng</strong></DialogTitle>
                <DialogContent>
                    <EditProfile 
                        provinces={provinces} 
                        updateProfile={handleUpdateProfile} 
                        setEditProfile={() => setOpenDialog(false)} 
                        profile={profile}
                    />
                </DialogContent>
            </WrapperDialog>
        </Dialog>
        </>
    );
};

export default AdminApprove;