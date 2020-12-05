import React, {useState, useEffect}from 'react';
import { Wrapper, Top, Bar, Header, Button, WrapperLoading } from './styles'
import Boxed from '../../components/Boxed';
import { useHistory } from 'react-router-dom';
import { getByGym } from '../../api/boxMessageApi';
import { connect } from 'react-redux';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';
import FixedLoadingSpinner from '../../components/FixedLoadingSpinner'

const AddGymLayout = ({children, step1, step2, step3, step4, step5, step6, step7, step8, id, gym, profile, loading1}) => {
    const history = useHistory();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getByGymApi = async (id) => {
            try {
                setLoading(true);
                const res = await getByGym(id);
                setLoading(false);
                setMessages(res.boxMessage);
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
        }
        if (profile) {
            getByGymApi(id);
        }
    }, [profile, id])

    return (
        <>
        {loading1 && <FixedLoadingSpinner />}
        <Boxed>
            <Wrapper>
                <Header>
                    <h1>Thêm phòng gym mới</h1>
                    <Button text="Thoát" icon={['fas', 'sign-out-alt']}onClick={() => history.push(`/profile/${gym.createBy._id}`)}/>
                </Header>
                {loading ? <WrapperLoading>
                    <MiniLoadingSpinner />
                </WrapperLoading> : gym && <Top>
                    <Bar active={gym.title} active1={step1} onClick={() => history.push(`/add-a-gym/title/${id}`)}>
                        Tiêu đề
                    </Bar>
                    <Bar active={gym.addresses.province !== null} active1={step2} onClick={() => history.push(`/add-a-gym/address/${id}`)}>
                        Địa chỉ
                    </Bar>
                    <Bar active={gym.phones.length > 0} active1={step3} onClick={() => history.push(`/add-a-gym/website-date-phone/${id}`)}>
                        Website<br />Thời gian<br />Số điện thoại
                    </Bar>
                    <Bar active={gym.services.length > 0} active1={step4} onClick={() => history.push(`/add-a-gym/services/${id}`)}>
                        Lớp học nhóm
                    </Bar>
                    <Bar active={gym.utilities.length > 0} active1={step5} onClick={() => history.push(`/add-a-gym/utilities/${id}`)}>
                        Tiện ích
                    </Bar>
                    <Bar active={gym.content} active1={step6} onClick={() => history.push(`/add-a-gym/introduce/${id}`)}>
                        Giới thiệu
                    </Bar>
                    <Bar active={gym.gallery.length > 0} active1={step7} onClick={() => history.push(`/add-a-gym/gallery/${id}`)}>
                        Thư viện ảnh
                    </Bar>
                    <Bar active={messages.length > 0} active1={step8} onClick={() => history.push(`/add-a-gym/message/${id}`)}>
                        Tin nhắn
                    </Bar>
                </Top>}
                {children}
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

export default connect(mapStateToProps, null)(AddGymLayout);