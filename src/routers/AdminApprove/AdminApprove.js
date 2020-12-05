import React, {useState, useEffect}from 'react';
import { Wrapper, LoadingDiv, Icon, Title, FlexBox, Left, Right, IconBtn, Body, Heading } from './styles';
import GymItem from '../../components/GymItem';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { getNotApproveGym, deleteGym, approveGym } from '../../api/gymApi';
import DialogConfirmDelete from '../../components/DialogConfirmDelete';
import SnackBar from '../../components/SnackBar';

const AdminApprove = () => {
    const [gyms, setGyms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
    const [selectedGym, setSelectedGym] = useState(null);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarDeleteFail, setOpenSnackBarDeleteFail] = useState(false);
    const [openSnackBarApprove, setOpenSnackBarApprove] = useState(false);

    useEffect(() => {  
        getNotApproveGymApi();
    }, [])

    const getNotApproveGymApi = async () => {
        try {
          setLoading(true);
          const res = await getNotApproveGym();
          setLoading(false);
          setGyms(res.gym.map(item => {
              return {
                  ...item._doc,
                  reviews: item.reviews
              }
          }));
        } catch(err) {
          setLoading(false);
          console.log(err);
        }
    }

    const handleDeleteGym = (id) => {
        setSelectedGym(id);
        setOpenDialogConfirmDelete(true);
    }

    const handleApproveGym = async (id, host) => {
        try {
            const res = await approveGym(id, {approve: true, user: host});
            if (res) {}
            setOpenSnackBarApprove(true);
            setGyms(gyms.filter(item => item._id !== id));
        } catch (error) {
            setOpenSnackBarDeleteFail(true);
            console.log(error)
        }
    }

    const deleteGymApi = async () => {
        try {
            await deleteGym(selectedGym);
            setOpenSnackBar(true);
            getNotApproveGymApi();
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
        setOpenSnackBarApprove(false);
    }

    return (
        <>
        <SnackBar open={openSnackBarApprove} message="Duyệt thành công" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBar} message="Xóa thành công" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarDeleteFail} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        <DialogConfirmDelete 
            openDialog={openDialogConfirmDelete} 
            handleCloseDialog={handleCloseDialog}
            handleAgree={deleteGymApi}
            handleDisagree={handleCloseDialog}
        />
        <Body>
            <Wrapper>
                <Heading><h1>Tất cả phòng gym đang chờ duyệt</h1></Heading>
                {loading ? <LoadingDiv><MiniLoadingSpinner /></LoadingDiv> : gyms.length === 0 ? <Title>
                    <Icon icon={['fas', 'folder-open']}></Icon>
                    <div>Không có phòng gym nào chờ duyệt</div>
                </Title> : gyms.map(item => {
                    return (
                        <FlexBox key={item._id}>
                            <Left>
                                <GymItem approve={true} gym={item}/>     
                            </Left>
                            <Right>
                                <IconBtn onClick={() => handleDeleteGym(item._id)}>
                                    <Icon icon={['fa', 'trash']} />
                                </IconBtn>
                                <IconBtn onClick={() => handleApproveGym(item._id, item.createBy)}>
                                    Duyệt
                                </IconBtn>
                            </Right>
                        </FlexBox>
                    )
                })}
            </Wrapper>
        </Body>
        </>
    );
};

export default AdminApprove;