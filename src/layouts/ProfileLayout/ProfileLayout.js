import React, {useState, useEffect}from 'react';
import Boxed from '../../components/Boxed';
import { Wrapper, Left, Right, ProfileImages, Avatar, Name, Children, MenuItem, Menu, MenuLink } from './styles';
import Profile from '../../components/Profile';
import EditProfile from '../../components/EditProfile';
import { connect } from 'react-redux';
import { updateProfile } from '../../store/Profile/ProfileAction';
import { updateProfileApi } from '../../api/userApi';
import SnackBar from '../../components/SnackBar';
import { getProvinces } from '../../api/province-districtAPI';
import { useLocation } from 'react-router-dom';
import FixedLoadingSpinner from '../../components/FixedLoadingSpinner';
import AvatarImg from '../../assets/images/avatar.jpg';

const ProfileLayout = ({
    profile, 
    updateProfile, 
    children, 
    userProfile, 
    loadingProfile, 
    getUserProfile, 
    id,
}) => {
    const [editProfile, setEditProfile] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarUpdateFail, setOpenSnackBarUpdateFail] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProvincesFromApi = async () => {
            try {
                const pro = await getProvinces();
                setProvinces(pro);
            } catch (err) {
                setProvinces([]);
            }
        }
        getProvincesFromApi();
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
        try {
            setLoading(true);
            const res = await updateProfileApi(profile._id, formData);
            setLoading(false);
            if(res.message === 'Update successfully') {
                setOpenSnackBar(true);
                setEditProfile(false);
                getUserProfile();
                updateProfile(res.user);
            }
        } catch (err) {
            setOpenSnackBarUpdateFail(true);
        }   
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
        setOpenSnackBarUpdateFail(false);
    }

    return (
        <>
        {loading && <FixedLoadingSpinner />}
        <SnackBar open={openSnackBar} message="Cập nhật thành công" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarUpdateFail} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        <Boxed>
            <ProfileImages src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/uh59Wh0/gym-sketch-illustration-hand-drawn-animation-transparent-sketch-illustration-hand-drawn-animation-transparent_hnroo21k_thumbnail-1080_07.png">
                {userProfile && <Avatar src={userProfile.profileImg || AvatarImg}/>}
                {userProfile && <Name>{userProfile.name}</Name>}
            </ProfileImages>
            <Wrapper>
                <Left>
                    {!editProfile && <Profile 
                        setEditProfile={setEditProfile} 
                        loadingProfile={loadingProfile} 
                        userProfile={userProfile} 
                        profile={profile}
                    />}
                    {editProfile && <EditProfile 
                        provinces={provinces} 
                        updateProfile={handleUpdateProfile} 
                        setEditProfile={setEditProfile} 
                        profile={profile}
                    />}
                </Left>
                <Right>
                    <Menu>
                        <MenuItem active={location.pathname === `/profile/${id}`}>
                            <MenuLink to={`/profile/${id}`}>Phòng gym</MenuLink>
                        </MenuItem>
                        <MenuItem active={location.pathname === `/profile/saves/${id}`}>
                            <MenuLink to={`/profile/saves/${id}`}>Đã lưu</MenuLink>
                        </MenuItem>
                        <MenuItem active={location.pathname === `/profile/reviews/${id}`}>
                            <MenuLink to={`/profile/reviews/${id}`}>Đánh giá</MenuLink>
                        </MenuItem>
                    </Menu>
                    <Children>{children}</Children>
                </Right>
            </Wrapper>
        </Boxed>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);