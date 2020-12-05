import React, {useState, useEffect} from 'react';
import AddGymLayout from '../../layouts/AddGymLayout';
import { useParams } from 'react-router-dom';
import { FlexBox, Left, Right, ButtonPlace, Button, Form } from './styles';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { updateGym, getOneGymToUpdate } from '../../api/gymApi';
import { connect } from 'react-redux';
import { HOME_PATH } from '../../constants/Path';

const AddStep1 = ({profile}) => {
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
    const [gym, setGym] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getOneGymApi = async (id) => {
            try {
                const res = await getOneGymToUpdate(id);
                if (res.gym.createBy._id === profile._id || profile.role === 'admin') {
                    setGym(res.gym);
                    setValue('title', res.gym.title, {shouldValidate: false});
                } else {
                    history.push(HOME_PATH);
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (profile) {
            getOneGymApi(id);
        }
    }, [id, profile, setValue, history])

    const handleSave = async (value) => {
        try {
            setLoading(true);
            const res = await updateGym(id, {...gym, title: value.title});
            setLoading(false);
            if (res) {}
            history.push(`/add-a-gym/address/${id}`);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <>
        <AddGymLayout loading1={loading} step1={true} gym={gym} id={id}>
            <FlexBox>
                <Left>
                    <Form>
                        <TextField
                            type="text"
                            name="title"
                            autoComplete="off"
                            label="Tiêu đề"
                            margin="normal"
                            inputRef={register({
                                required: true
                            })}
                            error={errors.title}
                            helperText={(errors.title &&
                                errors.title.type === 'required' &&
                                'Tên không được bỏ trống')}
                        />
                        <ButtonPlace>
                            <Button onClick={() => history.goBack()} text="Trở về"/>
                            <Button onClick={handleSubmit(handleSave)} text="Lưu và tiếp tục"/>
                        </ButtonPlace>
                    </Form>
                </Left>
                <Right>
                    <img alt="img"src='https://www.freevector.com/uploads/vector/preview/24986/6-02.jpg' />
                </Right>
            </FlexBox>
        </AddGymLayout>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        profile: state.ProfileReducer.userProfile,
    }
}

export default connect(mapStateToProps, null)(AddStep1);