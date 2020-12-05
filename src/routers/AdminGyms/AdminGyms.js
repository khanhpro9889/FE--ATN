import React, {useState, useEffect}from 'react';
import { Wrapper, LoadingDiv, Icon, Title, IconBtn, Body, Heading, SearchBar, ButtonSearch, BtnIcon } from './styles';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { findGym, deleteGym } from '../../api/gymApi';
import DialogConfirmDelete from '../../components/DialogConfirmDelete';
import SnackBar from '../../components/SnackBar';
import MyPagination from '../../components/MyPagination';
import { useHistory, useLocation, Link } from 'react-router-dom';
import FixedLoadingSpinner from '../../components/FixedLoadingSpinner';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { parseDate } from '../../utils/date';
import TextField from '@material-ui/core/TextField';

const AdminApprove = () => {
    const [gyms, setGyms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
    const [selectedGym, setSelectedGym] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarDeleteFail, setOpenSnackBarDeleteFail] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [openSnackBarChangeRole, setOpenSnackBarChangeRole] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const [totalGym, setTotalGym] = useState(0);
    const [searchContent, setSearchContent] = useState('');

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
        findGym(`?search=${search || ''}&province=-1&district=-1&page=${page || 1}`).then(res => {
            setGyms(res.gyms);
            setTotalPage(res.totalPage);
            setCurrentPage(parseInt(page) || 1);
            setTotalGym(res.totalGym);
            history.push(location.pathname + `?page=${page || 1}&search=${search || ''}`);
            setLoading(false);
        }).catch(err => setLoading(false));
         // eslint-disable-next-line
    }, [])

    const getAllGymsApi = async (currentPage, searchContent) => {
        try {
          setLoading(true);
          const res = await findGym(`?search=${searchContent || ''}&province=-1&district=-1&page=${currentPage || 1}`);
          setLoading(false);
          setGyms(res.gyms);
          setTotalPage(res.totalPage);
          setCurrentPage(res.currentPage);
          setTotalGym(res.totalGym)
        } catch(err) {
          setLoading(false);
          console.log(err);
        }
    }

    const handleDeleteGym = (id) => {
        setSelectedGym(id);
        setOpenDialogConfirmDelete(true);
    }

    const handleSearch = async () => {
        const res = await findGym(`?search=${searchContent || ''}&province=-1&district=-1&page=${1}`);
        history.push(`${location.pathname}?page=${1}&search=${searchContent}`)
        setGyms(res.gyms);
        setCurrentPage(1);
        setTotalPage(res.totalPage);
        setTotalGym(res.totalGym);
    }

    const deleteGymApi = async () => {
        try {
            setLoading1(true);
            await deleteGym(selectedGym);
            setLoading1(false);
            getAllGymsApi(`?search=${searchContent || ''}&province=-1&district=-1&page=${currentPage || 1}`);
            setOpenSnackBar(true);
        } catch (err) {
            setOpenSnackBarDeleteFail(true);
            console.log(err);
        }
    }

    const handleChangePage = async (e, value) => {
        try {
            setLoading(true);
            const res = await findGym(`?search=${searchContent || ''}&province=-1&district=-1&page=${value}`);
            setGyms(res.gyms);
            setTotalPage(res.totalPage);
            setCurrentPage(value);
            setTotalGym(res.totalGym);
            history.push(location.pathname + `?page=${value}&search=${searchContent}`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
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
            handleAgree={deleteGymApi}
            handleDisagree={handleCloseDialog}
        />
        {loading1 && <FixedLoadingSpinner />}
        <Body>
            <Wrapper>
                <Heading><h1>Tất cả phòng gym ({totalGym})</h1></Heading>
                {loading ? <LoadingDiv><MiniLoadingSpinner /></LoadingDiv> 
                    : <>
                        <SearchBar>
                            <TextField
                                type="text"
                                name="address"
                                autoComplete="off"
                                margin="normal"
                                placeholder="Tên phòng gym"
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
                        {gyms.length === 0 ? <Title>
                            <Icon icon={['fas', 'folder-open']}></Icon>
                            <div>Không có phòng gym nào</div>
                        </Title> : <>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>STT</strong></TableCell>
                                            <TableCell align="center"><strong>Tên</strong></TableCell>
                                            <TableCell align="center"><strong>Địa chỉ</strong></TableCell>
                                            <TableCell align="center"><strong>Tổng số đánh giá</strong></TableCell>
                                            <TableCell align="center"><strong>Lượt xem</strong></TableCell>
                                            <TableCell align="center"><strong>Ngày tạo</strong></TableCell>
                                            <TableCell align="center"><strong>Action</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {gyms.map((item, index) => {
                                            return (
                                                <TableRow key={item._id}>
                                                    <TableCell component="th" scope="row">
                                                        <strong>{index + 1}</strong>
                                                    </TableCell>
                                                    <TableCell align="center"><strong>{item.title}</strong></TableCell>
                                                    <TableCell align="center">{item.addresses.address}, {item.addresses.district.name}, {item.addresses.province.name}</TableCell>
                                                    <TableCell align="center">{item.reviews.length > 0 ? <Link to={`/admin/reviews/${item._id}`}>{item.reviews.length} đánh giá</Link> : item.reviews.length + ' đánh giá'}</TableCell>
                                                    <TableCell align="center">{item.totalViews} Lượt xem</TableCell>
                                                    <TableCell align="center">{parseDate(item.createAt)}</TableCell>
                                                    <TableCell align="right">
                                                        <IconBtn onClick={() => history.push(`/detail/${item._id}`)}>
                                                           <Icon icon={['fa', 'eye']} />
                                                        </IconBtn>
                                                        <IconBtn onClick={() => handleDeleteGym(item._id)}>
                                                           <Icon icon={['fa', 'trash']} />
                                                        </IconBtn>
                                                        <IconBtn onClick={() => history.push(`/add-a-gym/title/${item._id}`)}>
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
        </>
    );
};

export default AdminApprove;