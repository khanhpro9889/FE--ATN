import React, {useState, useEffect} from 'react';
import AddGymLayout from '../../layouts/AddGymLayout';
import { useParams } from 'react-router-dom';
import { FlexBox, Left, Right, ButtonPlace, Button, Form, Content, Element, WrapperLoading, IconButtonWrap, BtnIcon, ErrorText } from './styles';
import { useHistory } from 'react-router-dom';
import RUG from 'react-upload-gallery'
import "react-upload-gallery/dist/style.css";
import createFileList from 'create-file-list';
import background from '../../assets/images/3e277e36c26987b83e87efd18ce5c8ba.jpg';
import { updateGymFormData, getOneGymToUpdate } from '../../api/gymApi';
import { connect } from 'react-redux';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { HOME_PATH } from '../../constants/Path';

const AddStep7 = ({profile}) => {
    const { id } = useParams();
    const history = useHistory();
    const [gallery, setGallery] = useState(null);
    const [gym, setGym] = useState(null);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [errorSave, setErrorSave] = useState(false);
    const [loading1, setLoading1] = useState(false);

    const handleChangeImages = (images) => {
        const Files = images.map(item => {
            return item.file;
        })
        setGallery(createFileList(...Files));
    }

    useEffect(() => {
        const getOneGymApi = async (id) => {
            try {
                setLoading(true);
                const res = await getOneGymToUpdate(id);
                setLoading(false);
                if (res.gym.createBy._id === profile._id || profile.role === 'admin') {
                    setGym(res.gym);
                    setImages(res.gym.gallery);
                } else {
                    history.push(HOME_PATH);
                }
            } catch (error) {
                //setLoading(false);
                console.log(error)
            }
        }
        if (profile) {
            getOneGymApi(id);
        }
    }, [id, profile, history])

    const handleSave = async () => {
        if (gallery.length + images.length < 5) {
            return setErrorSave(true);
        }
        try {
            const formData = new FormData();
            for(var i = 0; i <= gallery.length; i++) {
                formData.append('gallery', gallery[i]);
            }
            // const newAddresses = gym.addresses.map(item => {
            //     return {
            //         ...item,
            //         district: item.district._id,
            //         province: item.province._id
            //     }
            // })
            const newAddresses = {...gym.addresses, district: gym.addresses.district._id, province: gym.addresses.province._id}
            formData.append('phones', JSON.stringify(gym.phones));
            formData.append('webs', JSON.stringify(gym.facebooks));
            formData.append('content', gym.content);
            formData.append('title', gym.title);
            formData.append('services', JSON.stringify(gym.services));
            formData.append('utilities', JSON.stringify(gym.utilities));
            formData.append('addresses', JSON.stringify(newAddresses));
            formData.append('times', JSON.stringify(gym.times));
            formData.append('images', JSON.stringify(images));
            formData.append('holiday', gym.holiday);
            setLoading1(true);
            const res = await updateGymFormData(id, formData);
            setLoading1(false);
            if (res) {}
            history.push(`/add-a-gym/message/${id}`)
        } catch (error) {
            setLoading1(false);
            console.log(error);
        }
    }

    const handleDeleteImage = (path) => {
        setImages(images.filter(item => item.path !== path));
    }

    return (
        <AddGymLayout loading1={loading1} step7={true} gym={gym} id={id}>
            <Content>
                {loading ? <WrapperLoading>
                        <MiniLoadingSpinner />
                    </WrapperLoading> : 
                    images && images.map(item => {
                    return (
                        <Element key={item._id}>
                            <img alt="img" src={item.path}/>
                            <IconButtonWrap
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    onClick={() => handleDeleteImage(item.path)}
                                >
                                <BtnIcon icon={['fas', 'trash']} />
                            </IconButtonWrap>
                        </Element>
                    )
                })}  
            </Content>
            <FlexBox>
                <Left>
                    <Form>
                        <div><label>Thư viện hình ảnh</label></div>
                        <RUG
                            accept={['jpg', 'jpeg', 'png']}
                            onChange={handleChangeImages}
                        />
                        {errorSave && (gallery.length + images.length) < 5 && <ErrorText>Vui lòng chọn ít nhất 5 ảnh</ErrorText>}
                        <ButtonPlace>
                            <Button onClick={() => history.goBack()} text="Trở về"/>
                            <Button onClick={handleSave} text="Lưu và tiếp tục"/>
                        </ButtonPlace>
                    </Form>
                </Left>
                <Right>
                    <img alt="img"src={background}/>
                </Right>
            </FlexBox>
        </AddGymLayout>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.userProfile,
    }
}

export default connect(mapStateToProps, null)(AddStep7);
