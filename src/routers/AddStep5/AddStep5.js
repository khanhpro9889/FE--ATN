import React, {useState, useEffect} from 'react';
import AddGymLayout from '../../layouts/AddGymLayout';
import { useParams, useHistory } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { 
    FlexBox, 
    Left, 
    Right, 
    ButtonPlace,
    Button, 
    Form,
    WrapperLoading,
    ClearFix,
    FloatLeftUtil
} from './styles';
import { getAllUtilities } from '../../api/utilityApi';
import background from '../../assets/images/1e9735611cbc188a1c48af757a51eba7.jpg';
import { updateGym, getOneGymToUpdate } from '../../api/gymApi';
import { connect } from 'react-redux';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import { HOME_PATH } from '../../constants/Path';

const AddStep5 = ({profile}) => {
    const { id } = useParams();
    const history = useHistory();
    const [utilities, setUtilities] = useState(null);
    const [selectedUtilities, setSelectedUtilities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gym, setGym] = useState(null);
    const [loading1, setLoading1] = useState(false);
    useEffect(() => {
        const fetchAllUtilities = async () => {
            const res = await getAllUtilities();
            setUtilities(res.utilities);
        }
        fetchAllUtilities();
    }, [])

    useEffect(() => {
        const getOneGymApi = async (id) => {
            try {
                setLoading(true);
                const res = await getOneGymToUpdate(id);
                setLoading(false);
                if (res.gym.createBy._id === profile._id || profile.role === 'admin') {
                    setGym(res.gym);
                    setSelectedUtilities(res.gym.utilities);
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

    const handleSave = async () => {
        try {
            setLoading1(true);
            const res = await updateGym(id, {...gym, webs: gym.facebooks, utilities: selectedUtilities});
            setLoading1(false);
            if (res) {}
            history.push(`/add-a-gym/introduce/${id}`)
        } catch (error) {
            setLoading1(false);
        }
    }

    return (
        <AddGymLayout loading1={loading1} step5={true} gym={gym} id={id}>
            <FlexBox>
                <Left>
                    <Form>
                        <div><label>Tiện ích</label></div>
                        {
                            <ClearFix>
                                {loading ? <WrapperLoading>
                                    <MiniLoadingSpinner />
                                </WrapperLoading> :
                                utilities && utilities.map(item => {
                                    return (
                                        <FloatLeftUtil key={item._id}>
                                            <FormControlLabel
                                                value={item._id}
                                                control={<Checkbox
                                                    checked={selectedUtilities.find(i => i.utility === item._id) ? true : false}
                                                    onChange={(event) => {
                                                        if(event.target.checked) {
                                                            setSelectedUtilities([...selectedUtilities, {utility: item._id, _id: selectedUtilities.length !== 0 ? (selectedUtilities[selectedUtilities.length - 1]._id + 1) : 1}]);
                                                        } else {
                                                            const newSelectedUtilities = selectedUtilities.filter(i => i.utility !== item._id);
                                                            setSelectedUtilities(newSelectedUtilities);
                                                        }
                                                    }}
                                                />}
                                                label={item.name}
                                            />
                                        </FloatLeftUtil>
                                    )
                                })}
                            </ClearFix>
                        }
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

export default connect(mapStateToProps, null)(AddStep5);
