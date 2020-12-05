import React, {useState, useEffect}from 'react';
import AddGymLayout from '../../layouts/AddGymLayout';
import { useParams } from 'react-router-dom';
import { FlexBox, Left, Right, ButtonPlace, Button, Form, ErrorText } from './styles';
import { useHistory } from 'react-router-dom';
import CkEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import background from '../../assets/images/8fc9cb0df043742b55c436c029049c4a.jpg';
import { updateGym, getOneGymToUpdate } from '../../api/gymApi';
import { connect } from 'react-redux';
import { HOME_PATH } from '../../constants/Path';

const AddStep6 = ({profile}) => {
    const { id } = useParams();
    const history = useHistory();
    const [data, setData] = useState('');
    const [content, setContent] = useState('');
    const [gym, setGym] = useState(null);
    const [errorSave, setErrorSave] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangeEditor = (e, editor) => {
        setContent(editor.getData());
    }

    useEffect(() => {
        const getOneGymApi = async (id) => {
            try {
                //setLoading(true);
                const res = await getOneGymToUpdate(id);
                //setLoading(false);
                if (res.gym.createBy._id === profile._id || profile.role === 'admin') {
                    setGym(res.gym);
                    setData(res.gym.content || '');
                    setContent(res.gym.content || '');
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
        if (!content) 
            return setErrorSave(true);
        try {
            setLoading(true);
            const res = await updateGym(id, {...gym, content: content});
            setLoading(false);
            if (res) {}
            history.push(`/add-a-gym/gallery/${id}`)
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <AddGymLayout loading1={loading} step6={true} gym={gym} id={id}>
            <FlexBox>
                <Left>
                    <Form>
                        <div><label>Thông tin thêm</label></div>
                        <CkEditor 
                            editor={ClassicEditor}
                            data={data}
                            onInit={(editor) => {

                            }}
                            config={
                                {
                                    ckfinder: {
                                        uploadUrl: 'http://localhost:3001/upload-text-editor'
                                    }
                                }
                            }
                            onChange={handleChangeEditor}
                        />
                        {errorSave && !content && <ErrorText>Vui lòng nhập giới thiệu</ErrorText>}
                        <ButtonPlace>
                            <Button onClick={() => history.goBack()} text="Trở về"/>
                            <Button onClick={handleSave} text="Lưu và tiếp tục"/>
                        </ButtonPlace>
                    </Form>
                </Left>
                <Right>
                    <img alt="img" src={background}/>
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

export default connect(mapStateToProps, null)(AddStep6);
