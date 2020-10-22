import React, {useState, useEffect}from 'react';
import AddForm from './AddForm';
import { Title } from './styles';
import { getProvinces, getDistrictsByProvince } from '../../api/province-districtAPI';
import { addGym } from '../../api/gymApi';
import SnackBar from '../../components/SnackBar';
import { connect } from 'react-redux';
import { getAllUtilities } from '../../api/utilityApi';

const AddGym = ({profile, back}) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openSnackBarAddFail, setOpenSnackBarAddFail] = useState(false);
    const [utilities, setUtilities] = useState(null);

    useEffect(() => {
        const getProvincesFromApi = async () => {
            const pro = await getProvinces();
            setProvinces(pro);
        }
        getProvincesFromApi();
        const fetchAllUtilities = async () => {
            const res = await getAllUtilities();
            setUtilities(res.utilities);
        }
        fetchAllUtilities();
    }, [])

    const getDistrictsByProvinceFromApi = async (id) => {
        const dist = await getDistrictsByProvince(id);
        setDistricts(dist);
    }

    const handleAddGym = async (value, images, content, services, utilities) => {
        try {
            const formData = new FormData();
            formData.append('title', value.title);
            formData.append('content', content);
            formData.append('district', value.district);
            formData.append('province', value.province);
            formData.append('address', value.address);
            formData.append('uid', profile._id);
            formData.append('phone', value.phone);
            formData.append('facebook', value.facebook);
            formData.append('services', JSON.stringify(services));
            formData.append('utilities', JSON.stringify(utilities));
            for(var i = 0; i <= images.length; i++) {
                formData.append('gallery', images[i]);
            }   
            setLoading(true);
            const res = await addGym(formData);
            setOpenSnackBar(true);
            setLoading(false);
        } catch (err) {
            setOpenSnackBarAddFail(true);
            setLoading(false);
        }
        
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
        setOpenSnackBarAddFail(false);
    }

    return (
        <>
        <SnackBar open={openSnackBar} message="Thêm thành công" handleClose={handleCloseSnackBar} type="success"/>
        <SnackBar open={openSnackBarAddFail} message="Có lỗi xảy ra" handleClose={handleCloseSnackBar} type="error"/>
        <Title>Thêm phòng gym mới</Title>
        <AddForm
            loading={loading}
            provinces={provinces}
            districts={districts}
            utilities={utilities}
            getDistrictsByProvince={getDistrictsByProvinceFromApi}
            handleAddGym={handleAddGym}
            back={back}
        />
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
        // updateProfile: (profile) => {
        //     dispatch(updateProfile(profile))
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGym);