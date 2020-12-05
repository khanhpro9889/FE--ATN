import React, {useState, useEffect, useRef, useCallback} from 'react';
import AddGymLayout from '../../layouts/AddGymLayout';
import { useParams } from 'react-router-dom';
import { FlexBox, Left, Right, ButtonPlace, Button, Form, ErrorText, Address, Item, WrapperAddress, WrapperLoading } from './styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { getProvinces, getDistrictsByProvince } from '../../api/province-districtAPI';
import { useForm } from 'react-hook-form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Marker, Popup, TileLayer, Map, withLeaflet } from "react-leaflet";
import Search from "react-leaflet-search";
import { updateGym, getOneGymToUpdate } from '../../api/gymApi';
import { connect } from 'react-redux';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { HOME_PATH } from '../../constants/Path';

class SearchComponent extends React.Component {
  render() {
    const ReactLeafletSearchComponent = withLeaflet(Search);  
    return (
        <ReactLeafletSearchComponent 
            {...this.props}
        />
    )
  } 
}

function DraggableMarker({info, setLatLng}) {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState({lat: 16.068, lng: 108.212})
    const markerRef = useRef(null);

    const updateMarker = event => {
        const latLng = event.target.getLatLng();
        setPosition(latLng);
        setLatLng(latLng);
    }

    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
    useEffect(() => {
        if (info) {
            setLatLng({lat: info.latLng.lat, lng: info.latLng.lng});
            setPosition({lat: info.latLng.lat, lng: info.latLng.lng});
        }
    }, [info, setLatLng])

    return (
      <Marker
        draggable={draggable}
        ondragend={updateMarker}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span style={{cursor: "pointer"}} onClick={toggleDraggable}>
            {draggable
              ? `Marker hiện có thể di chuyển (${position.lat} - ${position.lng})`
              : `Click để di chuyển marker (${position.lat} - ${position.lng})`}
          </span>
        </Popup>
      </Marker>
    )
}

const AddStep2 = ({profile}) => {
    const { id } = useParams();
    const history = useHistory();
    const {
        register,
        handleSubmit,
        errors,
        setValue,
    } = useForm({
        mode: 'onBlur',
        nativeValidation: false
    })
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('-1');
    const [selectedDistrict, setSelectedDistrict] = useState('-1');
    const [addresses, setAddresses] = useState(null);
    const [loading, setLoading] = useState([]);
    const [latLng, setLatLng] = useState(null)
    const [info, setInfo] = useState(null);
    const [errorMap, setErrorMap] = useState(false);
    const [errorSave, setErrorSave] = useState(false);
    const [gym, setGym] = useState(null);
    const [loading1, setLoading1] = useState(false);
    const [toUpdate, setToUpdate] = useState(null);

    useEffect(() => {
        const getProvincesFromApi = async () => {
            const pro = await getProvinces();
            setProvinces(pro);
        }
        getProvincesFromApi();
    }, [])

    useEffect(() => {
        const getOneGymApi = async (id) => {
            try {
                setLoading(true);
                const res = await getOneGymToUpdate(id);
                setLoading(false);
                if (res.gym.createBy._id === profile._id || profile.role === 'admin') {
                    setGym(res.gym);
                    setAddresses(res.gym.addresses);
                } else {
                    history.push(HOME_PATH);
                }
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
        }
        if (profile) {
            getOneGymApi(id);
        }
    }, [id, profile, history])

    useEffect(() => {
        register({name: 'province'}, {required: true});
        register({name: 'district'}, {required: true});
        setValue('district', '-1', {shouldValidate: false});
        setValue('province', '-1', {shouldValidate: false});
    }, [register, setValue])

    const handleAddAddress = (value) => {
        const findedDistrict = districts.find(item => item._id === value.district);
        const findedProvince = provinces.find(item => item._id === value.province);
        if (latLng) {
            setAddresses({
                address: value.address,
                district: findedDistrict,
                province: findedProvince,
                lat: latLng.lat, 
                lng: latLng.lng, 
            });
            setValue('province', '-1', {shouldValidate: false});
            setValue('district', '-1', {shouldValidate: false});
            setSelectedDistrict('-1');
            setSelectedProvince('-1');
            setValue('address', '', {shouldValidate: false});
            setLatLng(null);
            setErrorSave(false);
            setToUpdate(null);
        } else {
            setErrorMap(true);
        }
    }

    const getDistrictsByProvinceFromApi = async (id) => {
        const dist = await getDistrictsByProvince(id);
        setDistricts(dist);
    }

    const handleChangeProvinces = (e) => {
        setSelectedDistrict('-1');
        setValue('province', e.target.value);
        setSelectedProvince(e.target.value);
        getDistrictsByProvinceFromApi(e.target.value);
    }

    const handleChangeDistricts = (e) => {
        setSelectedDistrict(e.target.value);
        setValue('district', e.target.value);
    }

    const handleSave = async () => {
        if (addresses.province === null) {
            setErrorSave(true);
        } else {
            try {
                // const newAddress = listAddress.map(item => {
                //     return {
                //         ...item,
                //         district: item.district._id,
                //         province: item.province._id
                //     }
                // })
                setLoading1(true);
                const res = await updateGym(id, {...gym, addresses: {...addresses, district: addresses.district._id, province: addresses.province._id}});
                setLoading1(false);
                if (res) {}
                history.push(`/add-a-gym/website-date-phone/${id}`);
            } catch (error) {
                setLoading1(false);
                console.log(error);
            }
        }
    }

    return (
        <AddGymLayout loading1={loading1} step2={true} gym={gym} id={id}>
            {loading ? <WrapperLoading>
                <MiniLoadingSpinner />
            </WrapperLoading> :
                addresses && addresses.province !== null && 
                    <WrapperAddress key={addresses.lat}>
                        <FlexBox>
                            <Left>
                                <Address>
                                    <Item>Tỉnh/thành: <span>{addresses.province.name}</span></Item>
                                    <Item>quận/huyện: <span>{addresses.district.name}</span></Item>
                                    <Item>Địa chỉ: <span>{addresses.address}</span></Item>
                                    <Button onClick={() => setAddresses({
                                        district: null,
                                        province: null,
                                        lat: null,
                                        lng: null,
                                        address: null
                                    })} text="Xóa"/>
                                    <Button onClick={() => {
                                        setToUpdate(addresses);
                                        console.log(addresses);
                                        setValue('address', addresses.address, {shouldValidate: false})
                                        getDistrictsByProvinceFromApi(addresses.province._id);
                                        setSelectedDistrict(addresses.district._id);
                                        setSelectedProvince(addresses.province._id);
                                        setValue('province', addresses.province._id, {shouldValidate: false});
                                        setValue('district', addresses.district._id, {shouldValidate: false});
                                        setInfo({latLng: {lat: addresses.lat, lng: addresses.lng}})
                                    }} text="Sửa"/>
                                </Address>
                            </Left>
                            <Right>
                                <Map center={[addresses.lat, addresses.lng]} zoom={17} scrollWheelZoom={false}>
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={[addresses.lat, addresses.lng]}>
                                        <Popup>
                                            Your place
                                        </Popup>
                                    </Marker>
                                </Map>
                            </Right>
                        </FlexBox>
                    </WrapperAddress>
                }
            {((addresses && !addresses.province) || toUpdate) && <FlexBox>
                <Left>
                    <Form>
                        <label>Tỉnh/thành</label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="province"
                            onChange={handleChangeProvinces}
                            value={selectedProvince}
                        >
                            <MenuItem value='-1'>Chọn tỉnh/thành</MenuItem>
                            {provinces && provinces.map(item => {
                                return <MenuItem key={item.code} value={item._id}>{item.name}</MenuItem>
                            })}
                        </Select>
                        {(errors.province && errors.province.type === "required") && <ErrorText>Không được bỏ trống tỉnh/thành</ErrorText>}
                        <label>Quận/huyện</label>
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
                        {(errors.province && errors.district.type === "required") && <ErrorText>Không được bỏ trống quận/huyện</ErrorText>}
                        <TextField
                            type="text"
                            name="address"
                            autoComplete="off"
                            label="Địa chỉ chi tiết"
                            margin="normal"
                            inputRef={register({
                                required: true
                            })}
                            error={errors.address}
                            helperText={(errors.address &&
                                errors.address.type === 'required' &&
                                'Địa chỉ chi tiết không được bỏ trống')}
                        />
                        <ul>
                            <li>Bước 1. Tìm tên đường trên bản đồ</li>
                            <li>Bước 2. Click vào marker để hiện popup</li>
                            <li>Bước 3. Click vào popup để marker có thể di chuyển</li>
                            <li>Bước 4. Di chuyển marker đến vị trí của bạn</li>
                        </ul>
                        {(errorMap && !latLng) && <ErrorText>Vui lòng chọn vị trí trên bản đồ</ErrorText>}
                        <ButtonPlace>
                            <Button onClick={() => history.goBack()} text="Trở về"/>
                            <Button onClick={handleSubmit(handleAddAddress)} text="Thêm địa chỉ"/>
                        </ButtonPlace>
                        {errorSave && <ErrorText>Thêm 1 địa chỉ</ErrorText>}
                    </Form>
                </Left>
                <Right>
                    <Map center={info ? [info.latLng.lat, info.latLng.lng] : [16.068, 108.212]} zoom={17} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <SearchComponent
                            //showMarker= {true} 
                            //showPopup={true}
                            popup={<DraggableMarker/>}
                            //popupFormat={({ query, result }) => result.label} 
                            //openSearchOnLoad={true}
                            zoom={17}
                            retainZoomLevel= {false}  
                            animateZoom= {true} autoClose= {true}  
                            searchLabel={'Enter address, please'} 
                            keepResult= {true} 
                            closeResultsOnClick={true}
                        >
                            {(info) => {
                                setInfo(info)
                                return (
                                    <DraggableMarker info={info} setLatLng={setLatLng} />
                                )
                            }}
                        </SearchComponent>
                        <DraggableMarker info={info} setLatLng={setLatLng} />
                    </Map>
                </Right>
            </FlexBox>}
            {addresses && addresses.province !== null && <Button onClick={handleSave} text="Lưu và tiếp tục"/>}
        </AddGymLayout>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.userProfile,
    }
}

export default connect(mapStateToProps, null)(AddStep2);