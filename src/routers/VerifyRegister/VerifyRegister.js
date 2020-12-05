import React, {useState, useEffect} from 'react';
import { Parents, RegisterWrap, ButtonPlace, Icon, Title, IconWrapper, LoadingDiv } from './styles';
import MyButton from '../../components/MyButton';
import { useHistory, useLocation } from 'react-router-dom';
import RegisterBanner from '../../assets/images/register-banner.jpg';
import { verifyRegister } from '../../api/authApi';
import { HOME_PATH, LOGIN_PATH } from '../../constants/Path';
import MiniLoadingSpinner from '../../components/MiniLoadingSpinner';

const VerifyRegister = () => {
    const history = useHistory();
    const location = useLocation();
    const [success, setSuccess] = useState(false);
    const [errorMissing, setErrorMissing] = useState(false);
    const [errorTimesUp, setErrorTimesUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const verifyRegisterApi = async (body) => {
            try {
                setLoading(true);
                const res = await verifyRegister(body);
                setLoading(false);
                console.log(res.data);
                if (res.message === 'verify successfully') {
                    setSuccess(true);
                }
                if (res.data.message === 'No id') {
                    setErrorMissing(true);
                }
                if (res.data.message === `time's up`) {
                    setErrorTimesUp(true);
                    setUid(res.data.uid);
                }
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        const params = new URLSearchParams(location.search);
        const id = params.get('id');
        const token = params.get('token');
        const type = params.get('type');
        verifyRegisterApi({id, token, type});
         // eslint-disable-next-line
    }, [])

    return (
        <Parents src={RegisterBanner}>
            <RegisterWrap>
                {loading && <LoadingDiv><MiniLoadingSpinner /></LoadingDiv>}
                {success && 
                    <>
                        <IconWrapper>
                            <Icon icon={['fas', 'check-circle']}/>
                        </IconWrapper>
                        <Title>Xác nhận đăng ký thành công</Title>
                        <ButtonPlace>
                            <MyButton text="Đăng nhập" onClick={() => history.push(LOGIN_PATH)}/>
                        </ButtonPlace>
                    </>
                }
                {errorTimesUp && 
                    <>
                        <IconWrapper>
                            <Icon icon={['fas', 'clock']}/>
                        </IconWrapper>
                        <Title>Quá 15 phút, vui lòng xác nhận lại</Title>
                        <ButtonPlace>
                            <MyButton text="Xác nhận lại" onClick={() => history.push(`/confirm?id=${uid}&type=reconfirm`)}/>
                        </ButtonPlace>
                    </>
                }
                {errorMissing && 
                    <>
                        <IconWrapper>
                            <Icon icon={['fas', 'times-circle']}/>
                        </IconWrapper>
                        <Title>Missing info</Title>
                        <ButtonPlace>
                            <MyButton text="Trang chủ" onClick={() => history.push(HOME_PATH)}/>
                        </ButtonPlace>
                    </>
                }
            </RegisterWrap>
        </Parents>
    );
};

export default VerifyRegister;