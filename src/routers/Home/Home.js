import React, {useState, useEffect}from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { 
    Banner, 
    Title,
    BodyHome, 
    SubTitle, 
    Input1, 
    Input3, 
    ButtonSearch, 
    BtnIcon,
    Category,
    CategoryItem,
    LeftCategory,
    RightCategory,
    CategoryItemV2,
    CategoryItemV3,
    CategoryName,
    CategoryMobile,
    FullWidth,
    Content,
    Element,
    LoadingDiv
} from './styles';
import Boxed from '../../components/Boxed';
import background1 from '../../assets/images/banner.jpg';
import footballCategory from '../../assets/images/football-category.jpg';
import footballCategory2 from '../../assets/images/football-category-2.jpg';
import gymCategory from '../../assets/images/login-banner.jpg';
import kungfuCategory from '../../assets/images/vo-category.jpg';
import kungfuCategory2 from '../../assets/images/vo-category-2.jpg';
import swimming from '../../assets/images/swimming.jpg';
import swimming2 from '../../assets/images/swimming-2.png';
import ve from '../../assets/images/ve.jpg';
import nauan from '../../assets/images/nau-an.jpg'
import { getProvinces, getDistrictsByProvince } from '../../api/province-districtAPI';
import { getAllGyms } from '../../api/gymApi';
import Type from '../../constants/Category';
import GymItemV2 from '../../components/GymItemV2';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';

const Home = props => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('-1');
    const [selectedDistrict, setSelectedDistrict] = useState('-1');
    const [selectedType, setSelectedType] = useState('-1');
    const [gyms, setGyms] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProvincesFromApi();
        fetchGyms();
    }, [])

    const getProvincesFromApi = async () => {
        try {
            const pro = await getProvinces();
            setProvinces(pro);
        } catch (err) {
            setProvinces([]);
        }
    }

    const fetchGyms = async () => {
        try {
            setLoading(true);
            const res = await getAllGyms();
            const newGyms = res.gym.map(item => {
                return {
                    ...item._doc
                }
            })
            setLoading(false);
            setGyms(newGyms);
        } catch (err) {
            setGyms([]);
        }
    }

    const handleChangeProvinces = async (e) => {
        setSelectedDistrict('-1');
        setSelectedProvince(e.target.value);
        try {
            const dist = await getDistrictsByProvince(e.target.value);
            setDistricts(dist)
        } catch (err) {
            setDistricts([])
        }
    }

    const handleChangeDistricts = (e) => {
        setSelectedDistrict(e.target.value);
    }

    const handleChangeType = (e) => {
        setSelectedType(e.target.value);
    }

    return (
        <>
            <Banner src={background1}>
                <Title>Bạn cần tìm gì?</Title>
                <form>
                    <Input1
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="province"
                        onChange={handleChangeProvinces}
                        value={selectedProvince}
                    >
                        <MenuItem value='-1'>Chọn tỉnh/thành</MenuItem>
                        {provinces.length > 0 && provinces.map(item => {
                            return <MenuItem key={item.code} value={item._id}>{item.name}</MenuItem>
                        })}
                    </Input1>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="district"
                        onChange={handleChangeDistricts}
                        value={selectedDistrict}
                    >
                        <MenuItem value='-1'>Chọn quận/huyện</MenuItem>
                        {districts && districts.map(item => {
                            return <MenuItem key={item.code} value={item._id}>{item.name}</MenuItem>
                        })}
                    </Select>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="district"
                        onChange={handleChangeType}
                        value={selectedType}
                    >
                        <MenuItem value='-1'>Chọn thể loại</MenuItem>
                        {Type && Type.map(item => {
                            return <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                        })}
                    </Select>
                    <Input3 placeholder="Nhập tên"/>
                    <label htmlFor="icon-button-file">
                        <ButtonSearch
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <BtnIcon icon={['fas', 'search']} />
                        </ButtonSearch>
                    </label>
                </form>
            </Banner>
            <Boxed>
                <BodyHome>
                    <SubTitle>Phòng tập</SubTitle>
                    {loading ? 
                        <LoadingDiv>
                            <MiniLoadingSpinner />
                        </LoadingDiv> : 
                        <Content>
                            {gyms.map(item => {
                                return (
                                    <Element key={item._id}>
                                        <GymItemV2 gym={item}/>
                                    </Element>
                                )       
                            })}
                        </Content>
                    }
                </BodyHome>
            </Boxed>
            <Boxed>
                <Category>
                    <LeftCategory>
                        <CategoryItemV2 src={footballCategory} src2={footballCategory2}>
                            <CategoryName>Sân bóng đá</CategoryName>
                        </CategoryItemV2>
                        <CategoryItemV3 src={kungfuCategory} src2={kungfuCategory2}>
                            <CategoryName>CLB võ thuật</CategoryName>
                        </CategoryItemV3>
                        <CategoryItemV3 src={nauan} src2={kungfuCategory2}>
                            <CategoryName>Lớp học nấu ăn</CategoryName>
                        </CategoryItemV3>
                    </LeftCategory>
                    <RightCategory>
                        <CategoryItemV2 src={gymCategory} src2={background1}>
                            <CategoryName>Phòng tập</CategoryName>
                        </CategoryItemV2>
                        <CategoryItemV3 src={swimming} src2={swimming2}>
                            <CategoryName>Lớp học bơi</CategoryName>
                        </CategoryItemV3>
                        <CategoryItemV3 src={ve} src2={kungfuCategory2}>
                            <CategoryName>Lớp học vẽ</CategoryName>
                        </CategoryItemV3>
                    </RightCategory>
                </Category>
            </Boxed>
            <FullWidth>
                <Boxed>
                    <CategoryMobile>
                        <CategoryItem src={footballCategory} src2={footballCategory2}>
                            <CategoryName>Sân bóng đá</CategoryName>
                        </CategoryItem>
                        <CategoryItem src={kungfuCategory} src2={kungfuCategory2}>
                            <CategoryName>CLB võ thuật</CategoryName>
                        </CategoryItem>
                        <CategoryItem src={nauan} src2={kungfuCategory2}>
                            <CategoryName>Lớp học nấu ăn</CategoryName>
                        </CategoryItem>
                        <CategoryItem src={gymCategory} src2={background1}>
                            <CategoryName>Phòng tập</CategoryName>
                        </CategoryItem>
                        <CategoryItem src={swimming} src2={swimming2}>
                            <CategoryName>Lớp học bơi</CategoryName>
                        </CategoryItem>
                        <CategoryItem src={ve} src2={kungfuCategory2}>
                            <CategoryName>Lớp học vẽ</CategoryName>
                        </CategoryItem>
                    </CategoryMobile>
                </Boxed>
            </FullWidth>
        </>
    );
};

export default Home;