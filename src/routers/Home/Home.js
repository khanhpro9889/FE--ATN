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
    Content,
    Element,
    LoadingDiv,
    FlexBox,
    NameCity,
    Quantity,
    Item1,
    Item2,
    Item3,
    Item4,
    Sub,
    Div
} from './styles';
import Boxed from '../../components/Boxed';
import background1 from '../../assets/images/banner.jpg';
import { getProvinces, getDistrictsByProvinceByCode } from '../../api/province-districtAPI';
import { getTopRating, getNewestGyms, getQuantity, getTopWeek } from '../../api/gymApi';
import GymItemV2 from '../../components/GymItemV2';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import hn from '../../assets/images/hn.jpg';
import hcm from '../../assets/images/hcm.jpg';
import dn from '../../assets/images/dn.jpg';
import { useHistory } from 'react-router-dom';

const Home = props => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('-1');
    const [selectedDistrict, setSelectedDistrict] = useState('-1');
    const [gyms, setGyms] = useState([]);
    const [newestGyms, setNewestGyms] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [quantity, setQuantity] = useState(null);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);
    const [topWeekGyms, setTopWeekGyms] = useState([]);
    const history = useHistory();
    const [searchContent, setSearchContent] = useState('');

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
        const fetchGyms = async () => {
            try {
                setLoading1(true);
                const res = await getTopRating();
                setLoading1(false);
                setGyms(res.gym);
            } catch (err) {
                setLoading1(false);
                setGyms([]);
            }
            try {
                setLoading2(true);
                const res1 = await getNewestGyms();
                const newGyms1 = res1.gym.map(item => {
                    return {
                        ...item._doc,
                        reviews: item.reviews
                    }
                })
                setNewestGyms(newGyms1.reverse());
                setLoading2(false);
            } catch (error) {
                setLoading2(false);
            }
            try {
                setLoading3(true);
                const res = await getQuantity();
                setQuantity(res)
                setLoading3(false);
            } catch (error) {
                setLoading3(false);
            }
            try {
                setLoading4(true);
                const res = await getTopWeek();
                const newGyms = res.gym.map(item => {
                    return {
                        ...item._doc,
                        reviews: item.reviews
                    }
                })
                setTopWeekGyms(newGyms)
                setLoading4(false);
            } catch (error) {
                setLoading4(false);
            }
        }
        fetchGyms();
    }, [])

    const handleChangeProvinces = async (e) => {
        setSelectedDistrict('-1');
        setSelectedProvince(e.target.value);
        try {
            const dist = await getDistrictsByProvinceByCode(e.target.value);
            setDistricts(dist)
        } catch (err) {
            setDistricts([])
        }
    }

    const handleChangeDistricts = (e) => {
        setSelectedDistrict(e.target.value);
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
                            return <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
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
                            return <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
                        })}
                    </Select>
                    <Input3 
                        placeholder="Yoga, Kick Boxing,.. Tên phòng gym"
                        value={searchContent}
                        onChange={(e) => setSearchContent(e.target.value)}
                    />
                    <label htmlFor="icon-button-file">
                        <ButtonSearch
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => {
                                history.push(`/search-result?search=${searchContent}&province=${selectedProvince}&district=${selectedDistrict}`)
                            }}
                        >
                            <BtnIcon icon={['fas', 'search']} />
                        </ButtonSearch>
                    </label>
                </form>
            </Banner>
            <Boxed>
                <BodyHome>
                    <SubTitle>Top 5 phòng tập được đánh giá cao nhất</SubTitle>
                    {loading1 ? 
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
            {loading4 ? <LoadingDiv>
                    <MiniLoadingSpinner />
                </LoadingDiv> : topWeekGyms.length > 0 && <Boxed>
                <BodyHome>
                    <SubTitle>Phòng tập được xem nhiều trong tuần</SubTitle>
                    <Content>
                        {topWeekGyms.map(item => {
                            return (
                                <Element key={item._id}>
                                    <GymItemV2 gym={item}/>
                                </Element>
                            )       
                        })}
                    </Content>
                </BodyHome>
            </Boxed>}
            <Div>
                <Boxed>
                    <FlexBox>
                        <Item1>
                            <h1>Bạn cần tìm phòng tập ở đâu?</h1>
                            <Sub>Hãy cùng tìm đến phòng tập ở các thành phố lớn tại Việt Nam nào!</Sub>
                        </Item1>
                        {loading2 ? 
                            <LoadingDiv>
                                <MiniLoadingSpinner />
                            </LoadingDiv> : quantity && <>
                            <Item2 src={hn} onClick={() => history.push('/search-result?province=01')}>
                                <Quantity>{quantity.hn} Phòng</Quantity>
                                <NameCity>Hà Nội</NameCity>
                            </Item2>
                            <Item3 src={dn} onClick={() => history.push('/search-result?province=48')}>
                                <Quantity>{quantity.dn} Phòng</Quantity>
                                <NameCity>Đà Nẵng</NameCity>
                            </Item3>
                            <Item4 src={hcm} onClick={() => history.push('/search-result?province=79')}>
                                <Quantity>{quantity.hcm} Phòng</Quantity>
                                <NameCity>Hồ Chí Minh</NameCity>
                            </Item4>
                        </>}
                    </FlexBox>
                </Boxed>
            </Div>
            <Boxed>
                <BodyHome>
                    <SubTitle>Phòng tập mới đăng</SubTitle>
                    {loading3 ? 
                        <LoadingDiv>
                            <MiniLoadingSpinner />
                        </LoadingDiv> : <Content>
                        {newestGyms.map(item => {
                            return (
                                <Element key={item._id}>
                                    <GymItemV2 gym={item}/>
                                </Element>
                            )       
                        })}
                    </Content>}
                </BodyHome>
            </Boxed>
        </>
    );
};

export default Home;