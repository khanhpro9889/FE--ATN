import React, {useState, useEffect}from 'react';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import Boxed from '../../components/Boxed';
import { 
    Wrapper, 
    Left, 
    Right, 
    LeftLeft, 
    LeftCenter, 
    LeftRight, 
    FlexBox,    
    ButtonSearch, 
    BtnIcon,
    LoadingDiv1,
    ErrorText,
} from './styles';
import { Marker, Popup, TileLayer, Map } from "react-leaflet";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getProvinces, getDistrictsByProvinceByCode } from '../../api/province-districtAPI';
import TextField from '@material-ui/core/TextField';
import { useLocation, useHistory } from 'react-router-dom';
import { findGym } from '../../api/gymApi';
import GymItem from '../../components/GymItem';
import { connect } from 'react-redux';
import MyPagination from '../../components/MyPagination';

const SearchResult = ({profile}) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('-1');
    const [selectedDistrict, setSelectedDistrict] = useState('-1');
    const [searchContent, setSearchContent] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const history = useHistory();
    const [gyms, setGyms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [zoom, setZoom] = useState(11);

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
        const params = new URLSearchParams(location.search);
        const province = params.get('province');
        const district = params.get('district');
        const search = params.get('search');
        const page = params.get('page');
        if (province) {
            setSelectedProvince(province);
            handleChangeProvinces({target: {value: province}})
        }
        if (district) {
            setSelectedDistrict(district);
        }
        if (search) {
            setSearchContent(search);
        }
        if (page) {
            setCurrentPage(page);
        }
        if (search && search.length < 4) {
            return setError(true);
        }
        if (district === '-1' && province === '-1') {
            setZoom(5);
        }
        setLoading(true);
        const query = `?search=${search || ''}&province=${province || '-1'}&district=${district || '-1'}&page=${page || 1}`;
        findGym(query).then(res => {
            setGyms(res.gyms);
            setTotalPage(res.totalPage);
            setCurrentPage(parseInt(res.currentPage));
            history.push(`?search=${search || ''}&province=${province || '-1'}&district=${district || '-1'}&page=${page || 1}`);
            setLoading(false);
        }).catch(err => setLoading(false));
         // eslint-disable-next-line
    }, [])

    const handleChangeProvinces = async (e) => {
        setSelectedDistrict('-1');
        setSelectedProvince(e.target.value);
        if (e.target.value === '-1') {
            setDistricts([]);
        } else {
            try {
                const dist = await getDistrictsByProvinceByCode(e.target.value);
                setDistricts(dist)
            } catch (err) {
                setDistricts([])
            }
        }
    }

    const handleChangeDistricts = (e) => {
        setSelectedDistrict(e.target.value);
    }

    const handleSearch = async () => {
        if (searchContent && searchContent.length < 4) {
            return setError(true);
        }
        if (searchContent !== '') {
            if (selectedProvince === '-1') {
                history.push(`/search-result?search=${searchContent}&page=${currentPage}`);
            } else {
                if (selectedDistrict !== '-1') {
                    history.push(`/search-result?search=${searchContent}&page=${currentPage}&province=${selectedProvince}&district=${selectedDistrict}`);
                } else {
                    history.push(`/search-result?search=${searchContent}&page=${currentPage}&province=${selectedProvince}`);
                }
            }
        } else {
            if (selectedProvince === '-1') {
                history.push(`/search-result?page=${currentPage}`);
            } else {
                if (selectedDistrict !== '-1') {
                    history.push(`/search-result?page=${currentPage}&province=${selectedProvince}&district=${selectedDistrict}`);
                } else {
                    history.push(`/search-result?page=${currentPage}&province=${selectedProvince}`);
                }
            }
        }
        try {
            setLoading(true);
            const query = `?search=${searchContent}&province=${selectedProvince}&district=${selectedDistrict}&page=${1}`;
            const res = await findGym(query);
            if (selectedDistrict !== '-1') {
                setZoom(15);
            }
            if (selectedDistrict === '-1' && selectedProvince !== '-1') {
                setZoom(11);
            }
            if (selectedDistrict === '-1' && selectedProvince === '-1') {
                setZoom(5);
            }
            setError(false);
            setGyms(res.gyms);
            setTotalPage(res.totalPage);
            setCurrentPage(res.currentPage);
            history.push(`?search=${searchContent}&province=${selectedProvince}&district=${selectedDistrict}&page=${res.currentPage}`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    const handleChangePage = async (e, value) => {
        try {
            setLoading(true);
            const query = `?search=${searchContent}&province=${selectedProvince}&district=${selectedDistrict}&page=${value}`;
            const res = await findGym(query);
            setError(false);
            setGyms(res.gyms);
            setTotalPage(res.totalPage);
            setCurrentPage(value);
            history.push(location.pathname + `?search=${searchContent}&province=${selectedProvince}&district=${selectedDistrict}&page=${value}`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    return (
        <>
        <Boxed>
            <Wrapper>
                <Left>
                    <FlexBox>
                        <LeftLeft>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="province"
                                onChange={handleChangeProvinces}
                                value={selectedProvince}
                            >
                                <MenuItem value='-1'>Chọn tỉnh/thành</MenuItem>
                                {provinces.length > 0 && provinces.map(item => {
                                    return <MenuItem key={item._id} value={item.code}>{item.name}</MenuItem>
                                })}
                            </Select>
                        </LeftLeft>
                        <LeftCenter>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="district"
                                onChange={handleChangeDistricts}
                                value={selectedDistrict}
                            >
                                <MenuItem value='-1'>Chọn quận/huyện</MenuItem>
                                {districts && districts.map(item => {
                                    return <MenuItem key={item._id} value={item.code}>{item.name}</MenuItem>
                                })}
                            </Select>
                        </LeftCenter>
                        <LeftRight>
                            <TextField
                                type="text"
                                name="address"
                                autoComplete="off"
                                margin="normal"
                                placeholder="Yoga, Kick Boxing,... hoặc tên phòng"
                                onChange={(e) => setSearchContent(e.target.value)}
                                value={searchContent}
                            />
                            <ButtonSearch
                                component="span"
                                onClick={handleSearch}
                            >
                                <BtnIcon icon={['fas', 'search']} />
                            </ButtonSearch>
                        </LeftRight>
                    </FlexBox>
                    {error && searchContent.length < 4 && <ErrorText>Vui lòng nhập ít nhất 4 ký tự</ErrorText>}
                    <h3>Kết quả tìm kiếm</h3>
                    {loading ? 
                        <LoadingDiv1>
                            <MiniLoadingSpinner />
                        </LoadingDiv1> : gyms.length > 0 
                            ? <>{gyms.map((item) => {
                                return (
                                    <>
                                        <GymItem gym={item} /><br />
                                    </>
                                )
                            })} 
                            {totalPage > 1 && <MyPagination totalPage={totalPage} currentPage={currentPage} onChange={handleChangePage}/>}
                        </> : <h2>Không tìm thấy thông tin</h2>
                    }
                </Left>
                <Right>
                    {gyms && <Map 
                            center={gyms.length > 0 ? [gyms[0].addresses.lat, gyms[0].addresses.lng] : [16.054407, 108.202164]} 
                            zoom={zoom} 
                            scrollWheelZoom={true}
                        >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {gyms && gyms.map(item => {
                            return (
                                <Marker key={item._id} position={[item.addresses.lat, item.addresses.lng]}>
                                    <Popup>
                                        {item.title}
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </Map>}
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

export default connect(mapStateToProps, null)(SearchResult);